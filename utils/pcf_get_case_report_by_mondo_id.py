# -*- coding: utf-8 -*-

import os
import re
import MySQLdb
import json
from flask import Flask, session, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)
app.secret_key = 'pubcasefinder1210'

#####
# DB setting
app.config.from_pyfile('../config.cfg')
db_sock = app.config['DBSOCK']
db_name = app.config['DBNAME']
db_user = app.config['DBUSER']
db_pw   = app.config['DBPW']

def pcf_get_case_report_by_mondo_id(r_mondo_id, r_lang):

    list_dict_cs = []
    OBJ_MYSQL = MySQLdb.connect(unix_socket=db_sock, host="localhost", db=db_name, user=db_user, passwd=db_pw, charset="utf8")

    if r_mondo_id != "":

        # J-Stageの症例報告を取得
        if r_lang == "ja":
            sql_JStage = u"select a.id_jstage, a.title_ja, a.url_ja, a.pdate from JStage as a left join AnnotOntoMONDOJStage as b on a.id_jstage=b.id_jstage where b.id_mondo=%s order by a.pdate desc"
            cursor_JStage = OBJ_MYSQL.cursor()
            cursor_JStage.execute(sql_JStage, (r_mondo_id,))
            values_JStage = cursor_JStage.fetchall()
            cursor_JStage.close()
            for value_JStage in values_JStage:
                id_jstage = value_JStage[0]
                title_ja  = value_JStage[1]
                url_ja    = value_JStage[2]
                pdate     = value_JStage[3]
                dict_jstage = {}
                dict_jstage['id']    = id_jstage
                dict_jstage['title'] = title_ja
                dict_jstage['url']   = url_ja
                dict_jstage['pyear'] = pdate
                list_dict_cs.append(dict_jstage)
        # PubMedの症例報告を取得
        elif r_lang == "en":
            sql_pubmed = u"select distinct a.PMID, b.title, b.pyear from AnnotOntoMONDO as a left join CaseReports as b on a.PMID = b.PMID where a.OntoID=%s order by b.pyear desc, b.title"
            cursor_pubmed = OBJ_MYSQL.cursor()
            cursor_pubmed.execute(sql_pubmed, (r_mondo_id,))
            values_pubmed = cursor_pubmed.fetchall()
            cursor_pubmed.close()
            for value_pubmed in values_pubmed:
                pmid  = value_pubmed[0]
                title = value_pubmed[1]
                pyear = value_pubmed[2]
                dict_pubmed = {}
                dict_pubmed['id']  = pmid
                dict_pubmed['title'] = title
                dict_pubmed['url']   = "https://pubmed.ncbi.nlm.nih.gov/" + str(pmid)
                dict_pubmed['pyear'] = pyear
                list_dict_cs.append(dict_pubmed)

    OBJ_MYSQL.close()

    return list_dict_cs

