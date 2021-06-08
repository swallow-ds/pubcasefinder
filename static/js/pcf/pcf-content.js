;(function ($) {

	const URL_GET_RANKING_BY_HPO_ID                 = 'https://pcf.dbcls.jp/pcf_get_ranking_by_hpo_id',
		  URL_GET_DATA_BY_ID                        = 'get_data_by_id',
		  URL_GET_OMIM_DATA_BY_OMIM_ID              = 'https://pubcasefinder.dbcls.jp/sparqlist/api/pcf_get_omim_data_by_omim_id',
		  URL_GET_ORPHA_DATA_BY_ORPHA_ID            = 'https://pubcasefinder.dbcls.jp/sparqlist/api/pcf_get_orpha_data_by_orpha_id',
		  URL_GET_GENE_DATA_BY_NCBI_GENE_ID         = 'https://pubcasefinder.dbcls.jp/sparqlist/api/pcf_get_gene_data_by_ncbi_gene_id',
		  URL_GET_CASE_DATA_BY_CASE_ID              = 'https://pubcasefinder.dbcls.jp/sparqlist/api/pcf_get_case_data_by_case_id',
		  URL_GET_COUNT_CASE_REPORT_BY_MONDO_ID     = '/pcf_get_count_case_report_by_mondo_id',
		  URL_GET_HPO_DATA_BY_OMIM_ID               = '/pcf_get_hpo_data_by_omim_id',
		  URL_GET_HPO_DATA_BY_HPO_ID                = '/pcf_get_hpo_data_by_hpo_id',
		  URL_GET_HPO_DATA_BY_ORPHA_ID              = '/pcf_get_hpo_data_by_orpha_id',
		  URL_GET_HPO_TOOLTIP_DATA_BY_HPO_ID        = 'https://pubcasefinder.dbcls.jp/sparqlist/api/pcf_get_hpo_tooltip_data_by_hpo_id',
		  URL_GET_GENE_TOOLTIP_DATA_BY_NCBI_GENE_ID = 'https://pubcasefinder.dbcls.jp/sparqlist/api/pcf_get_gene_tooltip_data_by_ncbi_gene_id',
		  URL_GET_DISEASE_TOOTIP_DATA_BY_OMIM_ID    = 'https://pubcasefinder.dbcls.jp/sparqlist/api/pcf_get_disease_tootip_data_by_omim_id',
		  URL_GET_CASE_REPORT_BY_MONDO_ID           = '/pcf_get_case_report_by_mondo_id',
		  URL_GET_COUNT_CASE_REPORT_BY_ORPHA_ID     = '/pcf_get_orpha_data_by_orpha_id',
		  URL_SHARE                                 = '/pcf_share',
		  URL_DOWNLOAD                              = '/pcf_download',
		  URL_PCF_FILTER_GET_OMIM_ID_BY_MONDO_ID            = 'pcf_filter_get_omim_id_by_mondo_id',
		  URL_PCF_FILTER_GET_OMIM_ID_BY_NCBI_GENE_ID        = 'pcf_filter_get_omim_id_by_ncbi_gene_id',
		  URL_PCF_FILTER_GET_OMIM_ID_BY_INHERITANCE_HPO_ID  = 'pcf_filter_get_omim_id_by_inheritance_hpo_id',
		  URL_PCF_FILTER_GET_ALL_OMIM_ID                    = 'pcf_filter_get_all_omim_id',
		  URL_PCF_FILTER_GET_ORPHA_ID_BY_MONDO_ID           = 'pcf_filter_get_orpha_id_by_mondo_id',
		  URL_PCF_FILTER_GET_ORPHA_ID_BY_NCBI_GENE_ID       = 'pcf_filter_get_orpha_id_by_ncbi_gene_id',
		  URL_PCF_FILTER_GET_ORPHA_ID_BY_INHERITANCE_HPO_ID = 'pcf_filter_get_orpha_id_by_inheritance_hpo_id',
		  URL_PCF_FILTER_GET_ALL_ORPHA_ID                   = 'pcf_filter_get_all_orpha_id',
		  URL_PCF_FILTER_GET_GENE_ID_BY_MONDO_ID            = 'pcf_filter_get_gene_id_by_mondo_id',
		  URL_PCF_FILTER_GET_GENE_ID_BY_INHERITANCE_HPO_ID  = 'pcf_filter_get_gene_id_by_inheritance_hpo_id',
		  URL_PCF_FILTER_GET_ALL_GENE_ID                    = 'pcf_filter_get_all_gene_id';

	const URL_PARA_TARGET         = 'target',
		  URL_PARA_PHENOTYPE      = 'phenotype',
		  URL_PARA_FILTER         = 'filter',
		  URL_PARA_SIZE           = 'size',
		  URL_PARA_DISPLAY_FORMAT = 'display_format',
		  URL_PARA_LANG           = 'lang',
		  URL_PARA_OMIM_ID        = 'omim_id',
		  URL_PARA_MONDO_ID       = 'mondo_id',
		  URL_PARA_NCBI_GENE_ID   = 'ncbi_gene_id',
		  URL_PARA_NCBI_ID        = 'ncbi_id',
		  URL_PARA_CASE_ID        = 'case_id',
		  URL_PARA_HPO_ID         = 'hpo_id',
		  URL_PARA_ORPHA_ID       = 'orpha_id',
  		  URL_PARA_TARGET_ID      = 'target_id',
		  URL_PARA_RANK           = 'rank',
		  URL_PARA_SCORE          = 'score',
		  URL_PARA_FORMAT         = 'format',
		  URL_PARA_SHARE          = 'share',
		  URL_PARA_URL            = 'url';


	const TARGET_OMIM='omim',TARGET_ORPHANET='orphanet',TARGET_GENE='gene',TARGET_CASE='case',
		  TARGET_LST=[TARGET_OMIM,TARGET_ORPHANET,TARGET_GENE,TARGET_CASE];

	const LANGUAGE_JA = 'ja',LANGUAGE_EN = 'en',
		  LANGUAGE = {
			[LANGUAGE_JA] : {
				'TAB_LABEL':{
					[TARGET_OMIM]:     '遺伝性疾患',
					[TARGET_ORPHANET]: '希少疾患',
					[TARGET_GENE]:     '遺伝子',
					[TARGET_CASE]:     '症例'
				},
				'SAMPLE_TAG_LABEL': {
					[TARGET_OMIM]:     [{'CLASS':'list-tag_blue', 'TEXT':'クエリに対応する症状'},
										{'CLASS':'list-tag_green','TEXT':'遺伝形式'},
										{'CLASS':'list-tag_gray', 'TEXT':'疾患原因遺伝子'}],
					[TARGET_ORPHANET]: [{'CLASS':'list-tag_blue', 'TEXT':'クエリに対応する症状'},
										{'CLASS':'list-tag_green','TEXT':'遺伝形式'},
										{'CLASS':'list-tag_gray', 'TEXT':'疾患原因遺伝子'}],
					[TARGET_GENE]:     [{'CLASS':'list-tag_blue', 'TEXT':'クエリに対応する症状'},
										{'CLASS':'list-tag_red',  'TEXT':'疾患名'},
										{'CLASS':'list-tag_green','TEXT':'遺伝形式'}],
					[TARGET_CASE]:     [{'CLASS':'list-tag_blue', 'TEXT':'クエリに対応する症状'},
										{'CLASS':'list-tag_gray', 'TEXT':'疾患原因遺伝子'}]
				},
				'DETAIL_LABEL': {
					'FIND_IMAGES':     '画像検索(Google)',
					'PHENOTYPE_LST': '症状一覧',
					'JA_REPORT':       '日本語症例報告',
					'EN_REPORT':       '英語症例報告',
					'UR_DBMS':         '日本語疾患詳細(UR-DBMS)',
				}
			},
			[LANGUAGE_EN] : {
				'TAB_LABEL':{
					[TARGET_OMIM]:     'Genetic Disease',
					[TARGET_ORPHANET]: 'Rare Disease',
					[TARGET_GENE]:     'Gene',
					[TARGET_CASE]:     'Case'
				},
				'SAMPLE_TAG_LABEL': {
					[TARGET_OMIM]:     [{'CLASS':'list-tag_blue', 'TEXT':'Matched Phenotype'},
										{'CLASS':'list-tag_green','TEXT':'Modes of Inheritance'},
										{'CLASS':'list-tag_gray', 'TEXT':'Causative Gene'}],
					[TARGET_ORPHANET]: [{'CLASS':'list-tag_blue', 'TEXT':'Matched Phenotype'},
										{'CLASS':'list-tag_green','TEXT':'Modes of Inheritance'},
										{'CLASS':'list-tag_gray', 'TEXT':'Causative Gene'}],
					[TARGET_GENE]:     [{'CLASS':'list-tag_blue', 'TEXT':'Matched Phenotype'},
										{'CLASS':'list-tag_red',  'TEXT':'Disease Name'},
										{'CLASS':'list-tag_green','TEXT':'Modes of Inheritance'}],
					[TARGET_CASE]:     [{'CLASS':'list-tag_blue', 'TEXT':'Matched Phenotype'},
										{'CLASS':'list-tag_gray', 'TEXT':'Causative Gene'}]
				},
				'DETAIL_LABEL': {
					'FIND_IMAGES':   'Find images(Google)',
					'PHENOTYPE_LST': 'Symptom List',
					'JA_REPORT':     'Case Report(JP)',
					'EN_REPORT':     'Case Report(EN)',
					'UR_DBMS':       'UR-DBMS'
				}
			}
		};

	const SETTING_KEY_TARGET         = 'PCF-TARGET',
		  SETTING_KEY_PHENOTYPE      = 'PCF-PHENOTYPE',
		  SETTING_KEY_FILTER         = 'PCF-FILTER',
		  SETTING_KEY_SIZE           = 'PCF-SIZE',
		  DISPLAY_FORMAT_FULL        = 'full', 
		  DISPLAY_FORMAT_SUMMARY     = 'summary',
		  SETTING_KEY_DISPLAY_FORMAT = 'PCF-DISPLAY-FORMAT',
		  SETTING_KEY_LANG           = 'PCF-LANG',
		  SETTING_KEY_ID_LST         = 'PCF-ID-LST';

	var DEFAULT_SETTINGS = {
		[SETTING_KEY_TARGET]:         TARGET_OMIM,
		[SETTING_KEY_PHENOTYPE]:      '',
		[SETTING_KEY_FILTER]:         '',
		[SETTING_KEY_SIZE]:           10,
		[SETTING_KEY_DISPLAY_FORMAT]: DISPLAY_FORMAT_FULL,
		[SETTING_KEY_LANG]:           LANGUAGE_JA
	};


	const	KEY_SETTING_OBJECT = 'pcf-setting',
			KEY_TARGET         = 'pcf-target';

	const CLASS_ACTIVE                 = "pcf-active",
		  CLASS_LOADED                 = "pcf-data-loaded",
		  CLASS_TAB_BUTTON_PREFIX      = "tab-button-",
		  CLASS_TAB_BUTTON_ICON_PREFIX = "icon-",
		  CLASS_ROW                    = "list-content",
		  CLASS_POPUP_PHENOTYPE        = "pcf-popup px-4 py-3 pcf-popup-pheotype",
		  CLASS_POPUP_INHERITANCE      = "pcf-popup px-4 py-3 pcf-popup-inheritance",
		  CLASS_POPUP_GENE             = "pcf-popup px-4 py-3 pcf-popup-gene",
		  CLASS_POPUP_DISEASE          = "pcf-popup px-4 py-3 pcf-popup-disease";

	const	POPUP_TYPE_PHENOTYPE   = "popup-phenotype",
			POPUP_TYPE_INHERITANCE = "popup-inheritance",
			POPUP_TYPE_GENE        = "popup-gene",
			POPUP_TYPE_DISEASE     = "popup-disease",
			KEY_POPUP_TYPE          = 'pcf-popup-type',
			KEY_POPUP_ID_PHENOTYPE  = 'pcf-phenotype-id',
			KEY_POPUP_ID_INHERTANCE = 'pcf-inheritance-id',
			KEY_POPUP_ID_NCBI_GENE  = 'pcf-gene-id',
			KEY_POPUP_ID_DISEASE    = 'pcf-disease-id',
			POPUP_ID_KEY_HASH = {
				[POPUP_TYPE_PHENOTYPE]   : KEY_POPUP_ID_PHENOTYPE,
				[POPUP_TYPE_INHERITANCE] : KEY_POPUP_ID_INHERTANCE,
				[POPUP_TYPE_GENE]        : KEY_POPUP_ID_NCBI_GENE,
				[POPUP_TYPE_DISEASE]     : KEY_POPUP_ID_DISEASE
			},
			KEY_POPUP_DATA         = 'pcf-popup-data',
			POPUP_HTML_ID_HASH = {
				[POPUP_TYPE_PHENOTYPE]   : "popover_html_phenotype",
				[POPUP_TYPE_INHERITANCE] : "popover_html_phenotype",
				[POPUP_TYPE_GENE]        : "popover_html_gene",
				[POPUP_TYPE_DISEASE]     : "popover_html_disease"
			},
			POPUP_URL_HASH = {
				[POPUP_TYPE_PHENOTYPE]   : URL_GET_HPO_TOOLTIP_DATA_BY_HPO_ID,
				[POPUP_TYPE_INHERITANCE] : URL_GET_HPO_TOOLTIP_DATA_BY_HPO_ID,
				[POPUP_TYPE_GENE]        : URL_GET_GENE_TOOLTIP_DATA_BY_NCBI_GENE_ID,
				[POPUP_TYPE_DISEASE]     : URL_GET_DISEASE_TOOTIP_DATA_BY_OMIM_ID
			},
			POPUP_URL_PARA_HASH = {
				[POPUP_TYPE_PHENOTYPE]   : URL_PARA_HPO_ID,
				[POPUP_TYPE_INHERITANCE] : URL_PARA_HPO_ID,
				[POPUP_TYPE_GENE]        : URL_PARA_NCBI_GENE_ID,
				[POPUP_TYPE_DISEASE]     : URL_PARA_MONDO_ID
			};

	// KEY:urlstr, VAL:array of Ranking data(JSON object)
	var pcf_ranking_cache = {};

	// return key(urlstr) of the ranking cache, contructed by the indicated target in the setting.
	function _contruct_ranking_cache_key(setting) {
		// use url as pcf_ranking_cache key
		return _contruct_url(URL_GET_RANKING_BY_HPO_ID, setting);
	}

	// contruct key and return relative ranking data(json object) in ranking cache 
	function _get_ranking_data_from_cache(setting){
		let key = _contruct_ranking_cache_key(setting);
		return pcf_ranking_cache[key];
	}
	
	// save the ranking data array into cache with the url as key.
	function _set_ranking_data_into_cache(ranking_data,setting){
		let key = _contruct_ranking_cache_key(setting);
		pcf_ranking_cache[key] = ranking_data;
	}

	// check if exist ranking data in the cache.
	function _is_exist_ranking_data(setting){
		let key = _contruct_ranking_cache_key(setting);
		return (key in pcf_ranking_cache);
	}

	// for load data for new page , return an array of ids,which are not loaded into tab content panel yet.
	// 1. get all ids from ranking data cache.
	// 2. find the start position
	// 3. retrun the ids of new page 
	function _find_unloaded_ids(setting){
		let retLst = [];
		
		let num_per_page = setting[SETTING_KEY_SIZE];

		let num_loaded = _get_target_loaded_num(setting[SETTING_KEY_TARGET]);

		let ranking_data_lst = _get_ranking_data_from_cache(setting);
		
		let start = 0;
		if(num_loaded > 0) start = num_loaded;
		
		for(let i=start; (i<ranking_data_lst.length && num_per_page > 0); i++){
			retLst.push(ranking_data_lst[i].id);
			num_per_page--;
		}
		
		return retLst;
	}

	// return [address]?[para1]=[val1]&[para2]=[val2]&...
	function _contruct_url_str(url, datalst){
		let str = url + "?";
		for(let para_name in datalst){
			str = str + para_name + "=" + datalst[para_name] + "&";
		}
		return str;
	}
	
	//contruct url
	function _contruct_url(url_key, setting){
		
		let url_str = "";
		
		if(url_key === URL_GET_RANKING_BY_HPO_ID){
			
			url_str = _contruct_url_str(URL_GET_RANKING_BY_HPO_ID, {[URL_PARA_TARGET] : setting[SETTING_KEY_TARGET], [URL_PARA_PHENOTYPE]: setting[SETTING_KEY_PHENOTYPE]});
			
		}else if(url_key === URL_GET_DATA_BY_ID && setting[SETTING_KEY_TARGET] === TARGET_OMIM){
			
			url_str = _contruct_url_str(URL_GET_OMIM_DATA_BY_OMIM_ID,{[URL_PARA_OMIM_ID]: setting[SETTING_KEY_ID_LST]});
			
		}else if(url_key === URL_GET_DATA_BY_ID && setting[SETTING_KEY_TARGET] === TARGET_ORPHANET){
			
			url_str = _contruct_url_str(URL_GET_ORPHA_DATA_BY_ORPHA_ID,{[URL_PARA_ORPHA_ID]: setting[SETTING_KEY_ID_LST]});
			
		}else if(url_key === URL_GET_DATA_BY_ID && setting[SETTING_KEY_TARGET] === TARGET_GENE){
			
			url_str = _contruct_url_str(URL_GET_GENE_DATA_BY_NCBI_GENE_ID,{[URL_PARA_NCBI_ID]: setting[SETTING_KEY_ID_LST]});
			
		}else if(url_key === URL_GET_DATA_BY_ID && setting[SETTING_KEY_TARGET] === TARGET_CASE){
			
			url_str = _contruct_url_str(URL_GET_CASE_DATA_BY_CASE_ID,{[URL_PARA_CASE_ID]: setting[SETTING_KEY_ID_LST]});

		}else if(url_key === URL_GET_HPO_TOOLTIP_DATA_BY_HPO_ID){
			url_str = _contruct_url_str(URL_GET_HPO_TOOLTIP_DATA_BY_HPO_ID,{[URL_PARA_HPO_ID]: setting[URL_PARA_HPO_ID]});
		}else if(url_key === URL_GET_GENE_TOOLTIP_DATA_BY_NCBI_GENE_ID){
			url_str = _contruct_url_str(URL_GET_GENE_TOOLTIP_DATA_BY_NCBI_GENE_ID,{[URL_PARA_NCBI_GENE_ID]: setting[URL_PARA_NCBI_GENE_ID]});
		}else if(url_key === URL_GET_DISEASE_TOOTIP_DATA_BY_OMIM_ID){
			url_str = _contruct_url_str(URL_GET_DISEASE_TOOTIP_DATA_BY_OMIM_ID,{[URL_PARA_MONDO_ID]: setting[URL_PARA_MONDO_ID]});
			
		}else if(url_key === URL_GET_HPO_DATA_BY_OMIM_ID){
			
			url_str = _contruct_url_str(URL_GET_HPO_DATA_BY_OMIM_ID,{[URL_PARA_OMIM_ID]: setting[SETTING_KEY_ID_LST]});

		}else if(url_key === URL_GET_HPO_DATA_BY_ORPHA_ID){
			
			url_str = _contruct_url_str(URL_GET_HPO_DATA_BY_ORPHA_ID,{[URL_PARA_ORPHA_ID]: setting[SETTING_KEY_ID_LST]});

		}else if(url_key === URL_GET_HPO_DATA_BY_HPO_ID){

			url_str = _contruct_url_str(URL_GET_HPO_DATA_BY_HPO_ID,{[URL_PARA_HPO_ID]: setting[SETTING_KEY_HPO_ID]});
		}
		
		return url_str;
	}

	// some util functions
	var _isObject   = function(value) {return $.isPlainObject(value);},
		_isArray    = function(value) {return $.isArray(value);},
		_isFunction = function(value) {return $.isFunction(value);},
		_isNumeric  = function(value) {return $.isNumeric(value);},
		_isString   = function(value) {return typeof value === 'string';},
		_isBoolean  = function(value) {return typeof value === 'boolean';},
		_isEmpty    = function(value, allowEmptyString) {return (value === null) || (value === undefined) || (!allowEmptyString ? value === '' : false) || (_isArray(value) && value.length === 0);	},
		_isDefined  = function(value) {return typeof value !== 'undefined';},
		_isExistVal = function(key, hash){
			if(_isEmpty(hash))  return false;
			
			if (!(key in hash)) return false;
			
			return !_isEmpty(hash[key]);
		},
		_hasJA = function( str ) {return ( str && str.match(/[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+/) )? true : false},
		_parseJson= function(text) {
			var json_data = null;
			try {
			    json_data = JSON.parse(text);
			} catch (d) {}
			return json_data;
		},
		_get_id_from_url = function(url_str){
			let ret = "";
			let tmp = url_str.split("?");
			if(tmp.length > 1){
				ret = tmp[1];
			}
			return ret;
		};
	
	// use target as key
	var tab_button_lst = {}, tab_panel_lst  = {};

	function _get_target_loaded_num(target){
		let $target_tab_panel = tab_panel_lst[target];
		return $target_tab_panel.find("." + CLASS_ROW).length;
	}

	function _get_active_target(){
		for(let target in tab_panel_lst){
			let $panel = tab_panel_lst[target];
			if($panel.hasClass(CLASS_ACTIVE)) return target;
		}
		// ありえない
		alert("SYS ERROR: no active panel!");
		return null;
	}


	function _set_active_target(target_in){
		for(let target in tab_button_lst){
			let $button = tab_button_lst[target];
			$button.removeClass(CLASS_ACTIVE);
		}

		for(let target in tab_panel_lst){
			let $panel = tab_panel_lst[target];
			$panel.removeClass(CLASS_ACTIVE);
		}

		tab_button_lst[target_in].addClass(CLASS_ACTIVE);
		tab_panel_lst[target_in].addClass(CLASS_ACTIVE);
	}
	
	function _clear_all(setting) {
		for(let target in tab_panel_lst){
			let $panel = tab_panel_lst[target];
			$panel.empty();
			let current_setting = $.extend(true,{}, setting, {[SETTING_KEY_TARGET]: target});
			$panel.data(KEY_SETTING_OBJECT,current_setting);
			$panel.removeClass(CLASS_LOADED);
		}
	}


	function _selectTab(target){
		_set_active_target(target);
		
		let $target_tab_panel = tab_panel_lst[target];
		
		let current_setting = $target_tab_panel.data(KEY_SETTING_OBJECT);
		
		if($target_tab_panel.hasClass(CLASS_LOADED)) return;
		
		if(_isEmpty(current_setting[SETTING_KEY_PHENOTYPE])) return;
		
		_run_pcf_search(current_setting);
	}

	function _contruct_popup_content_val(key,hash,delimer){
		if(!_isExistVal(key,hash)) return '';
		if(_isEmpty(hash[key])) return '';
		if(_isArray(hash[key])) {
			if(_isEmpty(delimer)) return hash[key].join(',');
			return hash[key].join(delimer);
		}
		return hash[key];
	}

	function _contruct_popup_content_val_hash(key_id,key_url,hash){
		if(!_isExistVal(key_id,hash)) return '';
		let ret = "";
		for(let i =0;i<hash[key_id].length;i++){
			let id  = hash[key_id][i];
			let url = hash[key_url][i];
			ret = ret + "<a href=\""+url+"\" target=\"_blank\">"+id+"</a>"
		}
		return ret;
	}

	function _contruct_popup_content(popup_id,popup_type,popup_data){
		
		let popup_html_id = POPUP_HTML_ID_HASH[popup_type];
		let content = $("#"+popup_html_id).html();

		if(popup_type === POPUP_TYPE_PHENOTYPE || popup_type === POPUP_TYPE_INHERITANCE){
			content = content.replace(/popup_content_pcf-phenotype-id/g, popup_id);	
			content = content.replace(/popup_content_hpo_url/g,   _contruct_popup_content_val('hpo_url',popup_data));	
			content = content.replace(/popup_content_name_ja/g,   _contruct_popup_content_val('name_ja',popup_data));
			content = content.replace(/popup_content_name_en/g,   _contruct_popup_content_val('name_en',popup_data));
			content = content.replace(/popup_content_definition/g,_contruct_popup_content_val('definition',popup_data));
			content = content.replace(/popup_content_comment/g,   _contruct_popup_content_val('comment',popup_data));
			content = content.replace(/popup_content_synonym/g,   _contruct_popup_content_val('synonym',popup_data));
		}else if(popup_type === POPUP_TYPE_GENE){
			content = content.replace(/popup_content_pcf-gene-id/g, popup_id);	
			content = content.replace(/popup_content_ncbi_gene_url/g,   _contruct_popup_content_val('ncbi_gene_url',popup_data));
			content = content.replace(/popup_content_hgnc_gene_url/g,   _contruct_popup_content_val('hgnc_gene_url',popup_data));
			content = content.replace(/popup_content_hgnc_gene_symbol/g,_contruct_popup_content_val('hgnc_gene_symbol',popup_data));
			content = content.replace(/popup_content_synonym/g,         _contruct_popup_content_val('synonym',popup_data,'|'));
			content = content.replace(/popup_content_full_name/g,       _contruct_popup_content_val('full_name',popup_data));
			content = content.replace(/popup_content_other_full_name/g, _contruct_popup_content_val('other_full_name',popup_data));
			content = content.replace(/popup_content_type_of_gene/g,    _contruct_popup_content_val('type_of_gene',popup_data));
			content = content.replace(/popup_content_location/g,        _contruct_popup_content_val('location',popup_data));
		}else if(popup_type === POPUP_TYPE_DISEASE){
			content = content.replace(/popup_content_pcf-disease-id/g, popup_id);
			content = content.replace(/popup_content_mondo_url/g, _contruct_popup_content_val('hpo_url',popup_data));	
			content = content.replace(/popup_content_name_ja/g,   _contruct_popup_content_val('name_ja',popup_data));
			content = content.replace(/popup_content_name_en/g,   _contruct_popup_content_val('name_en',popup_data));
			content = content.replace(/popup_content_definition/g,_contruct_popup_content_val('definition',popup_data));	
			content = content.replace(/popup_content_synonym/g,   _contruct_popup_content_val('synonym',popup_data));
			content = content.replace(/popup_content_omim_list/g, _contruct_popup_content_val_hash('omim_id','omim_url',popup_data));
			content = content.replace(/popup_content_orpha_list/g,_contruct_popup_content_val_hash('orpha_id','orpha_url',popup_data));
		}else {
			//ありえない
		}

		return content;
	}
	
	function _popoverContent() {  
		
		let content = '';  
		let $element = $(this);// popover trigger 
		let popup_type   = $element.data(KEY_POPUP_TYPE);
		let popup_id_key = POPUP_ID_KEY_HASH[popup_type]; 
		let popup_id     = $element.data(popup_id_key);

		let popup_data = $element.data(KEY_POPUP_DATA);
		if(_isEmpty(popup_data)){

			let url_str    = POPUP_URL_HASH[popup_type];
			let url_id_key = POPUP_URL_PARA_HASH[popup_type];
			url_str = _contruct_url(url_str,{[url_id_key]: popup_id}); 
			
			$.ajax({  
				url:    url_str,  
				method: "GET",  
				async:  false,  	
				dataType: "text",
				success:function(data){  
					let json_data = JSON.parse(data);
					$element.data(KEY_POPUP_DATA,json_data);
					content = _contruct_popup_content(popup_id,popup_type,json_data);
					$element.attr('data-content',content);
				}  
			});  

		}else{
			content = _contruct_popup_content(popup_id,popup_type,popup_data);
		}
		
		return content;  
	} 


	function _contruct_detail(id, phenoList, item, lang, target,$container_panel){

		let isJA = (lang === LANGUAGE_JA);
		// container
		//let $container_panel = $('<div>').addClass("list-content_right");
		
		// 1. english title
		if("omim_disease_name_en" in item){
			$('<h3>').text(item.omim_disease_name_en).appendTo($container_panel);
		}else if("orpha_disease_name_en"in item){
			$('<h3>').text(item.orpha_disease_name_en).appendTo($container_panel);
		}else if("hgnc_gene_symbol" in item){
			$('<h3>').text(item.hgnc_gene_symbol + " (NCBI "+id+")").appendTo($container_panel);
		}else{
			$('<h3>').text(id).appendTo($container_panel);
		}

		// 2. japanese title
		if(isJA && ("omim_disease_name_ja" in item)){
			$("<h2>").text(item.omim_disease_name_ja).appendTo($container_panel);
		}else if(isJA && ("orpha_disease_name_ja" in item)){
			$("<h2>").text(item.orpha_disease_name_ja).appendTo($container_panel);
		}

		// 3. phenotypes list
		if(!_isEmpty(phenoList)){
			let $container_list_query = $('<div>').addClass("list-query").appendTo($container_panel);
			phenoList.split(',').forEach(function(hpo_id){
				let $button = $('<span>').data(KEY_POPUP_TYPE,POPUP_TYPE_PHENOTYPE).data(KEY_POPUP_ID_PHENOTYPE,hpo_id)
										 .addClass("list-tag_blue").text(hpo_id).appendTo($container_list_query);
				$button.popover({html:true,placement:'bottom',trigger:'hover',content:_popoverContent,sanitize:false,
								template:'<div class=\"popover\" role=\"tooltip\"><div class="arrow"></div><div class=\"popover-body '+CLASS_POPUP_PHENOTYPE+'\"></div></div>'});
			});
		}
		
		// 4. 
		if(target === TARGET_OMIM || target === TARGET_ORPHANET){
			if((_isExistVal("inheritance_en",item)) || (_isExistVal("hgnc_gene_symbol",item) )){
				
				let $container_list_heredity = $('<div>').addClass("list-heredity-disease").appendTo($container_panel);
				
				if(_isExistVal("inheritance_en",item)){
					for(let i=0;i<item.inheritance_en.length;i++){
						let text = item.inheritance_en[i];
						if(isJA)text = item.inheritance_ja[i];
						$('<span>').addClass("list-tag_green").text(text).appendTo($container_list_heredity);
						
/*						let $button = $('<span>').data(KEY_POPUP_TYPE,POPUP_TYPE_INHERITANCE)
												 .data(KEY_POPUP_ID_INHERTANCE,inheritance_id)
												 .addClass("list-tag_green").text(text).appendTo($container_list_heredity);
						$button.popover({html:true,placement:'bottom',trigger:'click',content:_popoverContent,sanitize:false,
										template:'<div class=\"popover\" role=\"tooltip\"><div class="arrow"></div><div class=\"popover-body '+CLASS_POPUP_INHERITANCE+'\"></div></div>'});
*/						
						
					}
				}
	
				if(_isExistVal("hgnc_gene_symbol",item)){
					for(let i=0;i<item.hgnc_gene_symbol.length;i++){
						let text = item.hgnc_gene_symbol[i];
						let id    = item.ncbi_gene_id[i];
						let $button = $('<span>').data(KEY_POPUP_TYPE,POPUP_TYPE_GENE).data(KEY_POPUP_ID_NCBI_GENE,id)
												 .addClass("list-tag_gray").text(text).appendTo($container_list_heredity);
						$button.popover({html:true,placement:'bottom',trigger:'hover',content:_popoverContent,sanitize:false,
										template:'<div class=\"popover\" role=\"tooltip\"><div class=\"popover-body '+CLASS_POPUP_GENE+'\"></div></div>'});
					}
				}
			}
		}else if(target === TARGET_GENE){
			if(_isExistVal("mondo_disease_name_en",item)){
				let $container_list_diseasename = $('<div>').addClass("list-heredity-diseasename").appendTo($container_panel);
				
				for(let mondo_id in item.mondo_disease_name_en){
					let text = item.mondo_disease_name_en[mondo_id];
					if(isJA)text = item.mondo_disease_name_ja[mondo_id];
					$('<span>').addClass("list-tag_red").text(text).appendTo($container_list_diseasename);
				}
			}
			
			if(_isExistVal("inheritance_en",item)){
				let $container_list_disease = $('<div>').addClass("list-heredity-disease").appendTo($container_panel);
				for(let i=0;i<item.inheritance_en.length;i++){
					let text = item.inheritance_en[i];
					if(isJA)text = item.inheritance_ja[i];
					$('<span>').addClass("list-tag_green").text(text).appendTo($container_list_disease);
				}
			}
		}
		
		
		// 5. description p
		if(_isExistVal("description",item)){
			let $p = $('<p>').text(item.description).appendTo($container_panel);
			let href_str = "https://translate.google.co.jp/?hl=ja#en/ja/" + item.description;
			$("<a>").text(" >> Translate(Google)").attr( 'href', href_str).attr('target', '_blank').appendTo($p);
		}
		
		
		// 6. list link line
		if(target !== TARGET_CASE){
			let $list_link_panel = $('<div>').addClass("list-link").appendTo($container_panel);
			
			if(_isExistVal("omim_url" ,item)){
				$('<a>').text(id).attr('href',item.omim_url).attr('target','_blank').appendTo($list_link_panel);
			} else if(_isExistVal("orpha_url" ,item)){
				$('<a>').text(id).attr('href',item.orpha_url).attr('target','_blank').appendTo($list_link_panel);
			} else if(target === TARGET_GENE){
				$('<a>').text("NCBI " + id).attr('href',"https://www.ncbi.nlm.nih.gov/gene/?term=" + id).attr('target','_blank').appendTo($list_link_panel);

				if(_isExistVal("hgnc_gene_url",item)) {
					$('<a>').text("HGNC").attr('href',item.hgnc_gene_url).attr('target','_blank').appendTo($list_link_panel);
				}
				
				if(_isExistVal("hgnc_gene_symbol",item)) {
					let href_str = "http://www.hgmd.cf.ac.uk/ac/gene.php?gene=" +item.hgnc_gene_symbol;
					$('<a>').text("HGMD").attr('href',href_str).attr('target','_blank').appendTo($list_link_panel);
					
					href_str = "https://www.ncbi.nlm.nih.gov/clinvar/?term=" +item.hgnc_gene_symbol;
					$('<a>').text("ClinVar").attr('href',href_str).attr('target','_blank').appendTo($list_link_panel);
					
					href_str = "https://togovar.biosciencedbc.jp/?term=" +item.hgnc_gene_symbol;
					$('<a>').text("TogoVar").attr('href',href_str).attr('target','_blank').appendTo($list_link_panel);

					href_str = "https://www.ncbi.nlm.nih.gov/CBBresearch/Lu/Demo/LitVar/#!?query=" +item.hgnc_gene_symbol;
					$('<a>').text("LitVar").attr('href',href_str).attr('target','_blank').appendTo($list_link_panel);
					
					href_str = "https://www.ncbi.nlm.nih.gov/research/pubtator/?view=docsum&query=" +item.hgnc_gene_symbol;
					$('<a>').text("PubTator").attr('href',href_str).attr('target','_blank').appendTo($list_link_panel);

					href_str = "http://www.dgidb.org/genes/" + item.hgnc_gene_symbol + "#_interactions";
					$('<a>').text("DGIdb").attr('href',href_str).attr('target','_blank').appendTo($list_link_panel);
				}
			}
			
			if(isJA && (_isExistVal("ur_dbms_url", item))){
				$('<a>').text(LANGUAGE[lang].DETAIL_LABEL.UR_DBMS).attr('href',item.ur_dbms_url).attr('target','_blank').appendTo($list_link_panel);
			}
			
			
			if(_isExistVal("omim_disease_name_en", item)){
				let href_str = "http://www.google.com/search?q="+item.omim_disease_name_en+"&tbm=isch";
				//if (isJA) href_str = "http://www.google.com/search?q="+item.omim_disease_name_ja+"&tbm=isch";
				$('<a>').text(LANGUAGE[lang].DETAIL_LABEL.FIND_IMAGES).attr('href',href_str).attr('target','_blank').appendTo($list_link_panel);
			} else if(_isExistVal("orpha_disease_name_en", item)){
				let href_str = "http://www.google.com/search?q="+item.orpha_disease_name_en+"&tbm=isch";
				//if (isJA) href_str = "http://www.google.com/search?q="+item.orpha_disease_name_ja+"&amp;tbm=isch";
				$('<a>').text(LANGUAGE[lang].DETAIL_LABEL.FIND_IMAGES).attr('href',href_str).attr('target','_blank').appendTo($list_link_panel);
			}
			
			if(_isExistVal("mondo_url",item)){
				for(let i=0;i<item.mondo_url.length;i++){
					$('<a>').text("Monarch").attr('href',item.mondo_url[i]).attr('target','_blank').appendTo($list_link_panel);
				}
			}
	
			if(_isExistVal("kegg_url",item)){
				item.kegg_url.forEach(function(url_str){
					$('<a>').text("KEGG:" + _get_id_from_url(url_str)).attr('href',url_str).attr('target','_blank').appendTo($list_link_panel);
				});
			}
	
			if(_isExistVal("gene_reviews_url",item)){
				item.gene_reviews_url.forEach(function(url_str){
					$('<a>').text("Gene Reviews").attr('href',url_str).attr('target','_blank').appendTo($list_link_panel);
				});
			}
			
			if(_isExistVal("gtr_url",item)){ 
				item.gtr_url.forEach(function(url_str){
					$('<a>').text("GTR").attr('href',url_str).attr('target','_blank').appendTo($list_link_panel);
				});
			}
		
		}
		
		
		//7. list link line
		if(target === TARGET_OMIM || target === TARGET_ORPHANET) {

			let $list_show_panel = $('<div>').addClass("list-show").appendTo($container_panel);
			
			let $a_pheno_list = $('<a>').text(LANGUAGE[lang].DETAIL_LABEL.PHENOTYPE_LST).appendTo($list_show_panel);
			$("<div class=\"list-show_click\"><i class=\"material-icons\">add_box</i><span>Show("+item.count_hpo_id+")</span></div>").appendTo($a_pheno_list);

			let $a_ja_report =$('<a>').addClass("v_line_left").text(LANGUAGE[lang].DETAIL_LABEL.JA_REPORT).appendTo($list_show_panel);
			$("<div class=\"list-show_click\"><i class=\"material-icons\">add_box</i><span>Show</span></div>").appendTo($a_ja_report);

			let $a_en_report= $('<a>').addClass("v_line_left").text(LANGUAGE[lang].DETAIL_LABEL.EN_REPORT).appendTo($list_show_panel);
			$("<div class=\"list-show_click\"><i class=\"material-icons\">add_box</i><span>Show</span></div>").appendTo($a_en_report);
		}
		
		return $container_panel;
	}

	function _show_result(detail_data, setting){
		
		let target       = setting[SETTING_KEY_TARGET];
		let lang         = setting[SETTING_KEY_LANG];
		let loaded_num   = _get_target_loaded_num(target);
		let num_per_page = setting[SETTING_KEY_SIZE];
				
		let isFirstLoad = true;
		if(loaded_num > 0) isFirstLoad = false;
		 
		let $target_tab_panel = tab_panel_lst[target];
		if($target_tab_panel.hasClass(CLASS_LOADED)) return;
		
		let ranking_list = _get_ranking_data_from_cache(setting);
		if(_isEmpty(ranking_list)) return;
		
		let total_num = ranking_list.length;
		let total_num_str = total_num.toLocaleString("en-US");
		
		// top
		if(isFirstLoad){
			let $top_panel = $('<div>').addClass("list-header").appendTo($target_tab_panel);
			$('<div>').addClass("list-results").text(total_num_str + " results").appendTo($top_panel);
			let $tag_sample_container = $('<div>').addClass("list-tag_sample").appendTo($top_panel);
			LANGUAGE[lang]['SAMPLE_TAG_LABEL'][target].forEach(function(item){
				$('<span>').text(item.TEXT).addClass(item.CLASS).css({'margin-left':'5px'}).appendTo($tag_sample_container);
			});
		}
		// data table
		var $table;
		if(isFirstLoad){
			$table = $('<table>').css({'width':'100%'}).appendTo($target_tab_panel);
		}else{
			$table = $target_tab_panel.find("table")[0];
			
			// output the page row
			let $tr = $('<tr>').addClass("list-content-pagenum").appendTo($table);
			
			let page_num = parseInt(loaded_num/num_per_page, 10);
			
			let $td  = $("<td colspan=\"2\">").text("Page " + page_num).addClass('list-content_center').appendTo($tr);
			
		}
		
		let i=loaded_num;
		for(;(i<ranking_list.length && num_per_page>0);i++){
			
			let $tr = $('<tr>').addClass(CLASS_ROW).appendTo($table);
			let $td_left  = $('<td>').addClass('list-content_left').appendTo($tr);
			let $td_right = $('<td>').addClass('list-content_right').appendTo($tr);

			// left
			let $rank = $('<div>').addClass('rank').appendTo($td_left);
			let input_str = "<input type=\"checkbox\" value=\""+ranking_list[i].id+"\"><p>"+ranking_list[i].rank+"</p></input>";
			$(input_str).appendTo($rank);
			
			
			let percentage_str = "<span>("+ (ranking_list[i].score * 100).toFixed(1)+"%)</span>";
			$(percentage_str).appendTo($td_left);
			let $list_content_left_bt = $('<div>').addClass('list-content_left_bt').appendTo($td_left);
			$('<a>').text("Copy").append("<i class=\"material-icons\">content_copy</i>").appendTo($list_content_left_bt);
			$('<a>').text("Like").append("<i class=\"material-icons\">favorite_border</i>").appendTo($list_content_left_bt);
			
			//right
			if(ranking_list[i].id in detail_data ){
				_contruct_detail(ranking_list[i].id, ranking_list[i].matched_hpo_id, detail_data[ranking_list[i].id], lang, target,$td_right);
			} else {
				$td_right.text('No Search Results for ('+ranking_list[i].id+').').css({'text-align':'center','vertical-align':'middle'});
			}
			
			num_per_page--;
		}

		// bottom
		if(isFirstLoad){
			let $bottom_panel = $('<div>').addClass("list-footer").appendTo($target_tab_panel);
			$('<div>').addClass("list-results").text(total_num_str + " results").appendTo($bottom_panel);
			let button_str = "<button><span><i class=\"material-icons\">add</i></span><p>Show More</p></button>";
			$(button_str)
			.data(KEY_TARGET,target)
			.click(function(){
				let target = $(this).data(KEY_TARGET);
				let $target_tab_panel = tab_panel_lst[target];
				$target_tab_panel.removeClass(CLASS_LOADED);
				let setting = $target_tab_panel.data(KEY_SETTING_OBJECT);
				_search_detail_data_and_show_result(setting);
			})
			.appendTo($bottom_panel);
		}else{
			
		} 	
		
		// set panel status to loaded
		$target_tab_panel.addClass(CLASS_LOADED);
	}

	
	function _search_detail_data_and_show_result(setting){
			
		let uncached_list = _find_unloaded_ids(setting);
	
		// check if  needs to be load from interent	
		if(_isEmpty(uncached_list)) return;

		// search detail data from internet and draw result
		setting[SETTING_KEY_ID_LST] = uncached_list.join(",");
		
		let url_str = _contruct_url(URL_GET_DATA_BY_ID, setting);
		_run_ajax(url_str,'GET', 'text', true, function(data){
			if(!_isEmpty(data)){
				var json_data = _parseJson(data);
				_show_result(json_data, setting);
			}
			pcf_hide_loading();
		});
	}
	
	// for the input parameters do the 
	function _run_pcf_search(setting){
		
		if(!_is_exist_ranking_data(setting)){
			//search ranking from internet
			let url_str = _contruct_url(URL_GET_RANKING_BY_HPO_ID,setting);

			pcf_show_loading();
			_run_ajax(url_str,'GET', 'text', true, function(data){
				var json_data = _parseJson(data);
				if(!_isEmpty(json_data)){
					_set_ranking_data_into_cache(json_data,setting);
					_search_detail_data_and_show_result(setting);
				}else{
					pcf_hide_loading();
				}
			});
			
			
		} else {
			_search_detail_data_and_show_result(setting);
		}
	}

	function _run_ajax(url_str,http_type, response_dataType, async, callback,callback_fail){

		
		$.ajax({	
			url:      url_str,  // 通信先のURL
			type:     http_type,		// 使用するHTTPメソッド(get/post)
			async:    async,          	// 使用するHTTPメソッド(true/false)
			dataType: response_dataType,
		}).done(function(data1,textStatus,jqXHR) {
			if(_isFunction(callback))callback(data1);
		}).fail(function(jqXHR, textStatus, errorThrown ) {
			alert(textStatus + errorThrown);
			if(_isFunction(callback_fail)) callback_fail();
			pcf_hide_loading();
		}).always(function(){
		});	
	}



	
	var methods = {
		init: function(options) {
			
			let setting = $.extend(true,{}, DEFAULT_SETTINGS, options || {});
			
			let $tab_button_panel    = $('<div>').addClass("tab-button-panel").appendTo(this);
			let $tab_content_wrapper = $('<div>').addClass("tab-content-wrapper").appendTo(this);
			
			TARGET_LST.forEach(function(target){
				
				let current_setting = $.extend(true,{}, setting, {[SETTING_KEY_TARGET]: target});

				let tab_button_html = "<span>"+
										"<i class=\"" + CLASS_TAB_BUTTON_ICON_PREFIX + target +"\"></i>"+
										LANGUAGE[current_setting[SETTING_KEY_LANG]]['TAB_LABEL'][target]+
									  "</span>";
				 
	
				tab_button_lst[target]=$(tab_button_html)
											.addClass(CLASS_TAB_BUTTON_PREFIX + target)
											.data(KEY_SETTING_OBJECT, current_setting)
											.click(function(){_selectTab(target);})
											.appendTo($tab_button_panel);

				tab_panel_lst[target]=$('<div>')
											.addClass("tab-content-panel")
											.data(KEY_SETTING_OBJECT,current_setting)
											.attr('placeholder','No Search Results.')
											.appendTo($tab_content_wrapper);
			});
			
			_selectTab(setting[SETTING_KEY_TARGET]);
			
			return this.each(function () {
				$(this);
			});
		},
		search: function(options) {
			
			let current_setting = $.extend(true,{}, DEFAULT_SETTINGS);
						
			if(_isExistVal(URL_PARA_TARGET, options)) {
				current_setting[SETTING_KEY_TARGET] = options[URL_PARA_TARGET];
			}else{
				current_setting[SETTING_KEY_TARGET] = _get_active_target();
			}
			
			if(_isExistVal(URL_PARA_PHENOTYPE, options)) current_setting[SETTING_KEY_PHENOTYPE] = options[URL_PARA_PHENOTYPE];
			if(_isExistVal(URL_PARA_FILTER   , options)) current_setting[SETTING_KEY_FILTER]    = options[URL_PARA_FILTER];
			if(_isExistVal(URL_PARA_SIZE     , options)) current_setting[SETTING_KEY_SIZE]      = options[URL_PARA_SIZE];
			if(_isExistVal(URL_PARA_FORMAT   , options)) current_setting[SETTING_KEY_FORMAT]    = options[URL_PARA_FORMAT];
			if(_isExistVal(URL_PARA_LANG     , options)) current_setting[SETTING_KEY_LANG]      = options[URL_PARA_LANG];

			_clear_all(current_setting);

			_selectTab(current_setting[SETTING_KEY_TARGET]);
		}
	};
	
	$.fn.pcf_content = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else {
			return methods.init.apply(this, arguments);
		}
	};

}(jQuery));
