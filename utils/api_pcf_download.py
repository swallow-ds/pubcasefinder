# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, redirect, url_for, jsonify
import os
import re
import json
import MySQLdb
import requests

app = Flask(__name__)


#####
# DB設定
app.config.from_pyfile('../config.cfg')
db_sock = app.config['DBSOCK']
db_name = app.config['DBNAME']
db_user = app.config['DBUSER']
db_pw   = app.config['DBPW']


#####
# POST: API for PhenoTouch
# /get_hpo_by_text
# カンマ区切りのHPO IDを返す
# マッチするものがない場合はnoneを返す
#####
def pcf_download(r_target, r_phenotype, r_target_id, r_format, r_range):

    url_api_pcf_get_ranking_by_hpo_id         = "https://pcf.dbcls.jp/pcf_get_ranking_by_hpo_id"
    url_api_pcf_get_omim_data_by_omim_id      = "https://pubcasefinder.dbcls.jp/sparqlist/api/pcf_get_omim_data_by_omim_id"
    url_api_pcf_get_orpha_data_by_orpha_id    = "https://pubcasefinder.dbcls.jp/sparqlist/api/pcf_get_orpha_data_by_orpha_id"
    url_api_pcf_get_gene_data_by_ncbi_gene_id = "https://pubcasefinder.dbcls.jp/sparqlist/api/pcf_get_gene_data_by_ncbi_gene_id"
    url_api_pcf_get_case_data_by_case_id      = ""

    dict_param_api_pcf_get_ranking_by_hpo_id         = {"target":r_target, "phenotype":r_phenotype}
    dict_param_api_pcf_get_omim_data_by_omim_id      = {"omim_id":r_target_id, "mode":"download"}
    dict_param_api_pcf_get_orpha_data_by_orpha_id    = {"orpha_id":r_target_id, "mode":"download"}
    dict_param_api_pcf_get_gene_data_by_ncbi_gene_id = {"ncbi_gene_id":r_target_id, "mode":"download"}
    dict_param_api_pcf_get_case_data_by_case_id      = {"case_id":r_target_id, "mode":"download"}

    r_ranking = requests.get(url_api_pcf_get_ranking_by_hpo_id, params=dict_param_api_pcf_get_ranking_by_hpo_id)
    r_data = requests.get(url_api_pcf_get_omim_data_by_omim_id, params=dict_param_api_pcf_get_omim_data_by_omim_id)

    #print(r_ranking.text)
    #print(r_data.text)

    json_ranking = r_ranking.json()
    json_data = r_data.json()

    for entry in json_ranking:
        if entry["id"] in json_data:
            json_data[entry["id"]]["id"] = entry["id"]
            json_data[entry["id"]]["rank"] = entry["rank"]
            json_data[entry["id"]]["score"] = entry["score"]
            json_data[entry["id"]]["matched_hpo_id"] = entry["matched_hpo_id"]
            print(json.dumps(json_data[entry["id"]], indent=4))

    return


def main():
    print(pcf_download("omim", "HP:0000347,HP:0003022,HP:0009381,HP:0000204,HP:0000625", "", "json", "full"))

if __name__ == '__main__':
    main()
