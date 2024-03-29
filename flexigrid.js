/*
 * Flexigrid for jQuery -  v1.1
 *
 * Copyright (c) 2008 Paulo P. Marinas (code.google.com/p/flexigrid/)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 */
(function ($) {
	/*
	 * jQuery 1.9 support. browser object has been removed in 1.9 
	 */
	var browser = $.browser
	
	if (!browser) {
		function uaMatch( ua ) {
			ua = ua.toLowerCase();

			var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
				/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
				/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
				/(msie) ([\w.]+)/.exec( ua ) ||
				ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
				[];

			return {
				browser: match[ 1 ] || "",
				version: match[ 2 ] || "0"
			};
		};

		var matched = uaMatch( navigator.userAgent );
		browser = {};

		if ( matched.browser ) {
			browser[ matched.browser ] = true;
			browser.version = matched.version;
		}

		// Chrome is Webkit, but Webkit is also Safari.
		if ( browser.chrome ) {
			browser.webkit = true;
		} else if ( browser.webkit ) {
			browser.safari = true;
		}
	}
	
    /*!
     * START code from jQuery UI
     *
     * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
     * Dual licensed under the MIT or GPL Version 2 licenses.
     * http://jquery.org/license
     *
     * http://docs.jquery.com/UI
     */
     
    if(typeof $.support.selectstart != 'function') {
        $.support.selectstart = "onselectstart" in document.createElement("div");
    }
    
    if(typeof $.fn.disableSelection != 'function') {
        $.fn.disableSelection = function() {
            return this.bind( ( $.support.selectstart ? "selectstart" : "mousedown" ) +
                ".ui-disableSelection", function( event ) {
                event.preventDefault();
            });
        };
    }
    
    /* END code from jQuery UI */

	$.addFlex = function (t, p) {
		if (t.grid) return false; //return if already exist
		p = $.extend({ //apply default properties
			height: 200, //default height//flexigrid插件的高度，单位为px  
			width: 'auto', //auto width//宽度值，auto表示根据每列的宽度自动计算，在IE6下建议设置具体值否则会有问题  
			striped: true, //apply odd even stripes//是否显示斑纹效果，默认是奇偶交互的形式 
			novstripe: false,
			minwidth: 30, //min width of columns//列的最小宽度
			minheight: 80, //min height of columns//列的最小高度
			resizable: true, //allow table resizing//resizable table是否可伸缩
			url: false, //URL if using data from AJAX
			method: 'POST',//'POST', //data sending method
			dataType: 'xml', //type of data for AJAX, either xml or json,数据加载的类型，xml,json
			errormsg: 'Connection Error',//错误提示信息
			usepager: false,//是否分页 
			nowrap: true,//是否不换行 
			page: 1, //current page,默认当前页
			total: 1, //total pages,总页面数
			useRp: true, //use the results per page select box,是否可以动态设置每页显示的结果数
			rp: 20, //results per page,每页默认的结果数  
//			rpOptions: [10, 15, 20, 30, 50], //allowed per-page values//可选择设定的每页结果数  
			rpOptions: [10, 15, 20, 50, 100, 200],//allowed per-page values//可选择设定的每页结果数    500以后 解析会有问题
			title: false, //是否包含标题
			checkbox: false, //是否要多选框
			singleSelect:false, //是否单选
			clickRowCenter: true, //点击行居中
			clickRowDefault: true, //点击行执行默认事件
			idProperty: 'id',
			pernumber: 'perNumber',
			pagestat: 'Displaying {from} to {to} of {total} items',//显示当前页和总页面的样式
			pagefrom: 'From',
			pagetext: 'Page',
			pagetotal: 'Total',
			findtext: 'Find',
			params: [], //allow optional parameters to be passed around
			procmsg: 'Processing, please wait ...', //正在处理的提示信息
			query: '',//搜索查询的条件
			qtype: '',//搜索查询的类别
			nomsg: 'No items',//无结果的提示信息
			minColToggle: 1, //minimum allowed column to be hidden//允许显示的最小列数 
			showToggleBtn: true, //show or hide column toggle popup//是否允许显示隐藏列，该属性有bug设置成false点击头脚本报错。
			hideOnSubmit: true,//是否在回调时显示遮盖
			showTableToggleBtn: false,//是否显示【显示隐藏Grid】的按钮 
			autoload: true,//自动加载，即第一次发起ajax请求
			blockOpacity: 0.5,//透明度设置
			preProcess: false,
			addTitleToCell: false, // add a title attr to cells with truncated contents
			dblClickResize: false, //auto resize column by double clicking
			onDragCol: false,
			onToggleCol: false,//当在行之间转换时，可在此方法中重写默认实现
			onChangeSort: false,//当改变排序时，可在此方法中重写默认实现，自行实现客户端排序
			sortData:{},//排序操作后需要导出时传排序参数
			onDoubleClick: false,
			onSuccess: false,//成功后执行 
			lstTableData: [], // 可以从传入
			onError: false,
			onSubmit: false, //using a custom populate function// 调用自定义的计算函数
            __mw: { //extendable middleware function holding object
                datacol: function(p, col, val) { //middleware for formatting data columns
                    var _col = (typeof p.datacol[col] == 'function') ? p.datacol[col](val) : val; //format column using function
                    if(typeof p.datacol['*'] == 'function') { //if wildcard function exists
                        return p.datacol['*'](_col); //run wildcard function
                    } else {
                        return _col; //return column without wildcard
                    }
                }
            },
            getGridClass: function(g) { //get the grid class, always returns g
                return g;
            },
            datacol: {}, //datacol middleware object 'colkey': function(colval) {}
            colResize: true, //from: http://stackoverflow.com/a/10615589
            colMove: true
		}, p);
		$(t).show() //show if hidden
			.attr({
				cellPadding: 0,
				cellSpacing: 0,
				border: 0
			}) //remove padding and spacing
			.removeAttr('width'); //remove width properties
		//create grid class
		var g = {
			hset: {},
			rePosDrag: function () {
				var cdleft = 0 - this.hDiv.scrollLeft;
				if (this.hDiv.scrollLeft > 0) cdleft -= Math.floor(p.cgwidth / 2);
				$(g.cDrag).css({
					top: g.hDiv.offsetTop + 1
				});
				if(this.cdpad == 0) {
					g.getCdpad();
				}
				var cdpad = this.cdpad;
				var cdcounter=0;
				$('div', g.cDrag).hide();
				$('thead tr:first th:visible', this.hDiv).each(function () {
					var n = $('thead tr:first th:visible', g.hDiv).index(this);
					var cdpos = parseInt($('div', this).width());
					if (cdleft == 0) cdleft -= Math.floor(p.cgwidth / 2);
					cdpos = cdpos + cdleft + cdpad;
					if (isNaN(cdpos)) {
						cdpos = 0;
					}
					$('div:eq(' + n + ')', g.cDrag).css({
						'left': (!(browser.mozilla) ? cdpos - cdcounter : cdpos) + 'px'
					}).show();
					cdleft = cdpos;
					cdcounter++;
				});
			},
			fixHeight: function (newH) {
				newH = false;
				if (!newH) newH = $(g.bDiv).height();
				var hdHeight = $(this.hDiv).height();
				var cdrhight = (newH + hdHeight) == 0 ? 24 : (newH + hdHeight);
				$('div', this.cDrag).each(
					function () {
						$(this).height(cdrhight);
					}
				);
				var nd = parseInt($(g.nDiv).height(), 10);
				if (nd > newH) {
					if(newH == 0) newH = nd;
					$(g.nDiv).height(newH).width('auto')/*.width(200)*/;
				}else {
					$(g.nDiv).height('auto').width('auto');
					nd = parseInt($(g.nDiv).height(), 10);
					if(nd > newH) {
						$(g.nDiv).height(newH).width('auto');
					}
				}
				$(g.block).css({
					height: newH,
					marginBottom: (newH * -1)
				});
				var hrH = g.bDiv.offsetTop + newH;
				if (p.height != 'auto' && p.resizable) hrH = g.vDiv.offsetTop;
				$(g.rDiv).css({
					height: hrH
				});
			},
			dragStart: function (dragtype, e, obj) { //default drag function start
                if (dragtype == 'colresize' && p.colResize === true) {//column resize
					$(g.nDiv).hide();
					$(g.nBtn).hide();
					var n = $('div', this.cDrag).index(obj);
					var ow = $('th:visible div:eq(' + n + ')', this.hDiv).width();
					$(obj).addClass('dragging').siblings().hide();
					$(obj).prev().addClass('dragging').show();
					this.colresize = {
						startX: e.pageX,
						ol: parseInt(obj.style.left, 10),
						ow: ow,
						n: n
					};
					$('body').css('cursor', 'col-resize');
				} else if (dragtype == 'vresize') {//table resize
					var hgo = false;
					$('body').css('cursor', 'row-resize');
					if (obj) {
						hgo = true;
						$('body').css('cursor', 'col-resize');
					}
					this.vresize = {
						h: p.height,
						sy: e.pageY,
						w: p.width,
						sx: e.pageX,
						hgo: hgo
					};
				} else if (dragtype == 'colMove') {//column header drag
                    $(e.target).disableSelection(); //disable selecting the column header
                    if((p.colMove === true)) {
                        $(g.nDiv).hide();
                        $(g.nBtn).hide();
                        this.hset = $(this.hDiv).offset();
                        this.hset.right = this.hset.left + $('table', this.hDiv).width();
                        this.hset.bottom = this.hset.top + $('table', this.hDiv).height();
                        this.dcol = obj;
                        this.dcoln = $('th', this.hDiv).index(obj);
                        this.colCopy = document.createElement("div");
                        this.colCopy.className = "colCopy";
                        this.colCopy.innerHTML = obj.innerHTML;
                        if (browser.msie) {
                            this.colCopy.className = "colCopy ie";
                        }
                        $(this.colCopy).css({
                            position: 'absolute',
                            'float': 'left',
                            display: 'none',
                            textAlign: obj.align
                        });
                        $('body').append(this.colCopy);
                        $(this.cDrag).hide();
                    }
				}
				$('body').noSelect();
			},
			dragMove: function (e) {
				if (this.colresize) {//column resize
					var n = this.colresize.n;
					var diff = e.pageX - this.colresize.startX;
					var nleft = this.colresize.ol + diff;
					var nw = this.colresize.ow + diff;
					if (nw > p.minwidth) {
						$('div:eq(' + n + ')', this.cDrag).css('left', nleft);
						this.colresize.nw = nw;
					}
				} else if (this.vresize) {//table resize
					var v = this.vresize;
					var y = e.pageY;
					var diff = y - v.sy;
					if (!p.defwidth) p.defwidth = p.width;
					if (p.width != 'auto' && !p.nohresize && v.hgo) {
						var x = e.pageX;
						var xdiff = x - v.sx;
						var newW = v.w + xdiff;
						if (newW > p.defwidth) {
							this.gDiv.style.width = newW + 'px';
							p.width = newW;
						}
					}
					var newH = v.h + diff;
					if ((newH > p.minheight || p.height < p.minheight) && !v.hgo) {
						this.bDiv.style.height = newH + 'px';
						p.height = newH;
						this.fixHeight(newH);
					}
					v = null;
				} else if (this.colCopy) {
					$(this.dcol).addClass('thMove').removeClass('thOver');
					if (e.pageX > this.hset.right || e.pageX < this.hset.left || e.pageY > this.hset.bottom || e.pageY < this.hset.top) {
						//this.dragEnd();
						$('body').css('cursor', 'move');
					} else {
						$('body').css('cursor', 'pointer');
					}
					$(this.colCopy).css({
						top: e.pageY + 10,
						left: e.pageX + 20,
						display: 'block'
					});
				}
			},
			dragEnd: function () {
				if (this.colresize) {
					var n = this.colresize.n;
					var nw = this.colresize.nw;
					$('th:visible div:eq(' + n + ')', this.hDiv).css('width', nw);
					$('tr', this.bDiv).each(
						function () {
							var $tdDiv = $('td:visible div:eq(' + n + ')', this);
							$tdDiv.css('width', nw);
							g.addTitleToCell($tdDiv);
						}
					);
					this.hDiv.scrollLeft = this.bDiv.scrollLeft;
					$('div:eq(' + n + ')', this.cDrag).siblings().show();
					$('.dragging', this.cDrag).removeClass('dragging');
					this.rePosDrag();
					this.fixHeight();
					this.colresize = false;
					if ($.cookies) {
						var name = p.colModel[n].name;		// Store the widths in the cookies
						$.cookie('flexiwidths/'+name, nw);
					}
				} else if (this.vresize) {
					this.vresize = false;
				} else if (this.colCopy) {
					$(this.colCopy).remove();
					if (this.dcolt !== null) {
						if (this.dcoln > this.dcolt) $('th:eq(' + this.dcolt + ')', this.hDiv).before(this.dcol);
						else $('th:eq(' + this.dcolt + ')', this.hDiv).after(this.dcol);
						this.switchCol(this.dcoln, this.dcolt);
						$(this.cdropleft).remove();
						$(this.cdropright).remove();
						this.rePosDrag();
						if (p.onDragCol) {
							p.onDragCol(this.dcoln, this.dcolt);
						}
					}
					this.dcol = null;
					this.hset = null;
					this.dcoln = null;
					this.dcolt = null;
					this.colCopy = null;
					$('.thMove', this.hDiv).removeClass('thMove');
					$(this.cDrag).show();
				}
				$('body').css('cursor', 'default');
				$('body').noSelect(false);
			},
			toggleCol: function (cid, visible) {
				var ncol = $("th[axis='col" + cid + "']", this.hDiv)[0];
				var n = $('thead th', g.hDiv).index(ncol);
				var cb = $('input[value=' + cid + ']', g.nDiv)[0];
				if (visible == null) {
					visible = ncol.hidden;
				}
				if ($('input:checked', g.nDiv).length < p.minColToggle && !visible) {
					return false;
				}
				if (visible) {
					ncol.hidden = false;
					$(ncol).show();
					cb.checked = true;
				} else {
					ncol.hidden = true;
					$(ncol).hide();
					cb.checked = false;
				}
				$('tbody tr', t).each(
					function () {
						if (visible) {
							$('td:eq(' + n + ')', this).show();
						} else {
							$('td:eq(' + n + ')', this).hide();
						}
					}
				);
				this.rePosDrag();
				if (p.onToggleCol) {
					p.onToggleCol(cid, visible);
				}
				return visible;
			},
			switchCol: function (cdrag, cdrop) { //switch columns
				$('tbody tr', t).each(
					function () {
						if (cdrag > cdrop) $('td:eq(' + cdrop + ')', this).before($('td:eq(' + cdrag + ')', this));
						else $('td:eq(' + cdrop + ')', this).after($('td:eq(' + cdrag + ')', this));
					}
				);
				//switch order in nDiv
				if (cdrag > cdrop) {
					$('tr:eq(' + cdrop + ')', this.nDiv).before($('tr:eq(' + cdrag + ')', this.nDiv));
				} else {
					$('tr:eq(' + cdrop + ')', this.nDiv).after($('tr:eq(' + cdrag + ')', this.nDiv));
				}
				if (browser.msie && browser.version < 7.0) {
					$('tr:eq(' + cdrop + ') input', this.nDiv)[0].checked = true;
				}
				this.hDiv.scrollLeft = this.bDiv.scrollLeft;
			},
			scroll: function () {
				this.hDiv.scrollLeft = this.bDiv.scrollLeft;
				this.rePosDrag();
			},
			addDataRowJson: function(data,type) { //外部加载数据  json 格式
				if(data.pagination != null) {
					data.page = data.pagination.currentPage;
					data.total = data.pagination.totalRecords;
				}
				p.total = data.total;
				if (!data || p.total === 0) {
					return;
				}
				p.pages = Math.ceil(p.total / p.rp);
				p.page = data.page;
				var tbody = null;
				if(type) {
					tbody = $(t).find('tbody');
				}else {
					tbody = document.createElement('tbody');
				}
				var k = (data.pagination.currentPage - 1) * data.pagination.pageRecords + 1;
				$.each(data.rows, function (i, row) {
					var tr = document.createElement('tr');
					var jtr = $(tr);
					if (i % 2 && p.striped) tr.className = 'erow';
					if (row[p.idProperty] != null) {
						tr.id = 'row' + row[p.idProperty];
						jtr.attr('data-id', row[p.idProperty]);
					}
					
					$('thead tr:first th', g.hDiv).each( //add cell
						function () {
							var td = document.createElement('td');
							var idx = $(this).attr('axis').substr(3);
							td.align = this.align;
							if(this.className) {
								td.className = this.className;
							}
							if(p.checkbox) {
								td.innerHTML = "<input type=\"checkbox\" class=\"selectItem\" name=\"selectItem\"  value=\""+row[p.idProperty]+"\"/>"
								idx -= 1;
							}
							// If each row is the object itself (no 'cell' key)
							if(idx >= 0 && p.colModel[idx]){
								if(p.colModel[idx].name == 'index'){
									td.innerHTML = k;
									k++;
								}else {
									//td.innerHTML = row[p.colModel[idx].name];
									var index = 0;
									var start = p.colModel[idx].name.indexOf('count');
									var end = p.colModel[idx].name.length;
									if(start >= 0 && p.colModel[idx].name != 'count'){
										var index_ = p.colModel[idx].name.substring(5,end);
										index = index_ == '' || null ? 0 : index_;
									}
									td.innerHTML = fixCellInfos(p, row, idx, index);
								}
							}
							// If the content has a <BGCOLOR=nnnnnn> option, decode it.
							var offs = td.innerHTML.indexOf( '<BGCOLOR=' );
							if( offs >0 ) {
								$(td).css('background', text.substr(offs+7,7) );
							}
							$(td).attr('abbr', $(this).attr('abbr'));
							$(tr).append(td);
							td = null;
						}
					);
					$(tbody).append(tr);
					tr = null;
				});
				$('tr', t).unbind();
				$(t).empty();
				if(p.checkbox) {
					$('table tr .selectAllItem', g.hDiv)[0].checked = false;
				}
				$(t).append(tbody);
				this.addCellProp();
				this.addRowProp();
				if(p.checkbox) {
					this.selectAllItemRow();
					this.selectItemRow();
				}
				this.rePosDrag();
				tbody = null;
				data = null;
				i = null;
				if (p.onSuccess) {
					p.onSuccess(this);
				}
				if (p.hideOnSubmit) {
					$(g.block).remove();
				}
				this.hDiv.scrollLeft = this.bDiv.scrollLeft;
				if (browser.opera) {
					$(t).css('visibility', 'visible');
				}
			},
			appendJsonData: function(rows,head) { //外部加载数据  json 格式
				var findbodys = $(t).find('tbody');
				var tbody = null;
				if(findbodys == null || findbodys.length == 0) {
					tbody = document.createElement('tbody');
					$(t).append(tbody);
				} else {
					tbody = findbodys[0];
				}
				$.each(rows, function (i, row) {
					var tr = document.createElement('tr');
					var jtr = $(tr);
					if (i % 2 && p.striped) tr.className = 'erow';
					if (row[p.idProperty] != null) {
						tr.id = 'row' + row[p.idProperty];
						jtr.attr('data-id', row[p.idProperty]);
					}
					if (row.color && row.color.toString().indexOf('#') >= 0) {
						jtr.css('color', row.color);
					}
					$('thead tr:first th', g.hDiv).each( //add cell
						function () {
							var td = document.createElement('td');
							var idx = $(this).attr('axis').substr(3);
							td.align = this.align;
							if(this.className) {
								td.className = this.className;
							}
							if(p.checkbox) {
								td.innerHTML = "<input type=\"checkbox\" class=\"selectItem\" name=\"selectItem\"  value=\""+row[p.idProperty]+"\"/>"
								idx -= 1;
							}
							// If each row is the object itself (no 'cell' key)
							if(idx >= 0  && p.colModel[idx]){
								if(p.colModel[idx].name == 'index'){
									td.innerHTML = $(t).find('tr').length + 1;
								}else {
									//td.innerHTML = row[p.colModel[idx].name];
									var index = 0;
									var start = p.colModel[idx].name.indexOf('count');
									var end = p.colModel[idx].name.length;
									if(start >= 0 && p.colModel[idx].name != 'count'){
										var index_ = p.colModel[idx].name.substring(5,end);
										index = index_ == '' || null ? 0 : index_;
									}
									if (typeof p.fillCellCallback == "function") {
										td.innerHTML = p.fillCellCallback(p, row, idx, index);
									} else {
										td.innerHTML = fixCellInfos(p, row, idx, index);
									}
								}
							}
							// If the content has a <BGCOLOR=nnnnnn> option, decode it.
							var offs = td.innerHTML.indexOf( '<BGCOLOR=' );
							if( offs >0 ) {
								$(td).css('background', text.substr(offs+7,7) );
							}
							$(td).attr('abbr', $(this).attr('abbr'));
							$(tr).append(td);
							td = null;
						}
					);
					if(head) {
						$(tbody).prepend(tr);
					}else {
						$(tbody).append(tr);
					}
					tr = null;
				});
				$('tr', t).unbind();
//				$(t).empty();
				if(p.checkbox) {
					$('table tr .selectAllItem', g.hDiv)[0].checked = false;
				}
//				$(t).append(tbody);
				this.addCellProp();
				this.addRowProp();
				if(p.checkbox) {
					this.selectAllItemRow();
					this.selectItemRow();
				}
				this.rePosDrag();
				tbody = null;
				data = null;
				i = null;
				if (p.onSuccess) {
					p.onSuccess(this);
				}
				if (p.hideOnSubmit) {
					$(g.block).remove();
				}
				this.hDiv.scrollLeft = this.bDiv.scrollLeft;
				if (browser.opera) {
					$(t).css('visibility', 'visible');
				}
			},
			removeRow: function(rowid) {
				var findbodys = $(t).find('tbody');
				if(findbodys != null && findbodys.length > 0) {
					//var tbody = findbodys[0];
					//tbody.find("tr[id='row"+rowid+"']").remove();
					//tbody.remove("#row" + rowid);
					$("#row" + rowid, t).remove();
				}
			},
			setFillCellFun: function(fun) {
				p.fillCellCallback = fun;
			},
			selectRowPropFun: function(fun) {
				p.selectRowProp = fun;
			},
			clickCheckBoxFun: function(fun) {
				p.clickCheckBox = fun;
			},
			
			
			mouseUpRowPropFun: function(fun) {
				p.mouseUpRowProp = fun;
			},
			getData: function(fun) {
				return this.saveData;
			},
			addData: function (data,type) { //parse data
				var time1 = new Date().getTime();
				if (p.dataType == 'json') {
					data = $.extend({rows: [], page: 0, total: 0}, data);
					data.rows = data.infos;
					if (typeof data.extra != "undefined") {
						data.extra = data.extra;
					} else {
						data.extra = null;
					}
					if(data.pagination != null) {
						data.page = data.pagination.currentPage;
						data.total = data.pagination.totalRecords;
					}
				}
				if (p.preProcess) {
					data = p.preProcess(data);
				}
				$('.pReload', this.pDiv).removeClass('loading');
				this.loading = false;
				if (!data) {
					$('.pPageStat', this.pDiv).html(p.errormsg);
                    if (p.onSuccess) p.onSuccess(this);
					if (p.hideOnSubmit) {
						$(g.block).remove();
					}
					g.showThisDiv('block','block','block','block','block','block');
					return false;
				}
				if (p.dataType == 'xml') {
					p.total = +$('rows total', data).text();
				} else {
					p.total = data.total;
				}
				if (p.total === 0) {
					p.lstTableData = [];
					this.saveData = data;
					if(p.checkbox) {
						$('table tr .selectAllItem', g.hDiv)[0].checked = false;
					}
					$('tr, a, td, div', t).unbind();
					$(t).empty();
					p.pages = 1;
					p.page = 1;
					this.buildpager();
					$('.pPageStat', this.pDiv).html(p.nomsg);
                    if (p.onSuccess) p.onSuccess(this);
					if (p.hideOnSubmit) {
						$(g.block).remove();
					}
					g.showThisDiv('block','block','block','block','block','block');
					return false;
				}
				p.pages = Math.ceil(p.total / p.rp);
				if (p.dataType == 'xml') {
					p.page = +$('rows page', data).text();
				} else {
					p.page = data.page;
				}
				if (!p.newp) {
					p.newp = 1;
				}
				g.showThisDiv('block','block','block','block','block','block');
				this.buildpager();
				//build new body
				var tbody = null;
				if(type) {
					tbody = $(t).find('tbody');
				}else {
					tbody = document.createElement('tbody');
				}
				var k = (data.pagination.currentPage - 1) * data.pagination.pageRecords + 1;
				if (p.dataType == 'json') {
					$.each(data.rows, function (i, row) {
						var tr = document.createElement('tr');
						var jtr = $(tr);
						if (row.name) tr.name = row.name;
						if (row.color && row.color.toString().indexOf('#') >= 0) {
							jtr.css('color', row.color);
						}
						if(row.background) {
							jtr.css('background', row.background);
						}else {
							if (i % 2 && p.striped) tr.className = 'erow';
						}
						if (row[p.idProperty]) {
							tr.id = 'row' + row[p.idProperty];
							jtr.attr('data-id', row[p.idProperty]);
						}
						
						$('thead tr:first th', g.hDiv).each( //add cell
							function () {
								var td = document.createElement('td');
								var idx = $(this).attr('axis').substr(3);
								td.align = this.align;
								if(this.className) {
									td.className = this.className;
								}
								if(p.checkbox) {
									td.innerHTML = "<input type=\"checkbox\" class=\"selectItem\" name=\"selectItem\"  value=\""+row[p.idProperty]+"\"/>"
									idx -= 1;
								}
								// If each row is the object itself (no 'cell' key)
								if(idx >= 0 &&  p.colModel[idx]){
									if(p.colModel[idx].name == 'index'){
										row.index = k;
										$(td).attr('data-index', k);
										$(td).addClass('index'+k);
										td.innerHTML = k;
										k++;
									}else {
										if (typeof row.cell == 'undefined') {
											//td.innerHTML = row[p.colModel[idx].name];
											var index = 0;
											var start = p.colModel[idx].name.indexOf('count');
											var end = p.colModel[idx].name.length;
											if(start >= 0 && p.colModel[idx].name != 'count'){
												var index_ = p.colModel[idx].name.substring(5,end);
												index = index_ == '' || null ? 0 : index_;
											}
											if (typeof p.fillCellCallback == "function") {
												td.innerHTML = p.fillCellCallback(p, row, idx, index);
											} else {
												td.innerHTML = fixCellInfos(p, row, idx, index);
											}
										} else {
											// If the json elements aren't named (which is typical), use numeric order
											//JSON元素未命名
		                                    var iHTML = '';
		                                    if (typeof row.cell[idx] != "undefined") {
		                                        iHTML = (row.cell[idx] !== null) ? row.cell[idx] : ''; //null-check for Opera-browser
		                                    } else {
		                                        iHTML = row.cell[p.colModel[idx].name];
		                                    }
		                                    td.innerHTML = p.__mw.datacol(p, $(this).attr('abbr'), iHTML); //use middleware datacol to format cols
										}
									}
								}
								// If the content has a <BGCOLOR=nnnnnn> option, decode it.
								var offs = td.innerHTML.indexOf( '<BGCOLOR=' );
								if( offs >0 ) {
                                    $(td).css('background', text.substr(offs+7,7) );
								}

								$(td).attr('abbr', $(this).attr('abbr'));
								$(tr).append(td);
								td = null;
							}
						);
						if ($('thead', this.gDiv).length < 1 && row.cell) {//handle if grid has no headers 无标题
							for (idx = 0; idx < row.cell.length; idx++) {
								var td = document.createElement('td');
								// If the json elements aren't named (which is typical), use numeric order
								if (typeof row.cell[idx] != "undefined") {
									td.innerHTML = (row.cell[idx] != null) ? row.cell[idx] : '';//null-check for Opera-browser
								} else {
									td.innerHTML = row.cell[p.colModel[idx].name];
								}
								$(tr).append(td);
								td = null;
							}
						}
						$(tbody).append(tr);
						tr = null;
					});
				} else if (p.dataType == 'xml') {
					var i = 1;
					$("rows row", data).each(function () {
						i++;
						var tr = document.createElement('tr');
						if ($(this).attr('name')) tr.name = $(this).attr('name');
						if ($(this).attr('color')) {
							$(tr).css('background',$(this).attr('id'));
						} else {
							if (i % 2 && p.striped) tr.className = 'erow';
						}
						var nid = $(this).attr('id');
						if (nid) {
							tr.id = 'row' + nid;
						}
						nid = null;
						var robj = this;
						$('thead tr:first th', g.hDiv).each(function () {
							var td = document.createElement('td');
							var idx = $(this).attr('axis').substr(3);
							td.align = this.align;
							var text = $("cell:eq(" + idx + ")", robj).text();
							var offs = text.indexOf( '<BGCOLOR=' );
							if( offs >0 ) {
								$(td).css('background',	 text.substr(offs+7,7) );
							}
                            td.innerHTML = p.__mw.datacol(p, $(this).attr('abbr'), text); //use middleware datacol to format cols
							$(td).attr('abbr', $(this).attr('abbr'));
							$(tr).append(td);
							td = null;
						});
						if ($('thead', this.gDiv).length < 1) {//handle if grid has no headers
							$('cell', this).each(function () {
								var td = document.createElement('td');
								td.innerHTML = $(this).text();
								$(tr).append(td);
								td = null;
							});
						}
						$(tbody).append(tr);
						tr = null;
						robj = null;
					});
				}
				this.saveData = data;
				$('tr', t).unbind();
				$(t).empty();
				if(p.checkbox) {
					$('table tr .selectAllItem', g.hDiv)[0].checked = false;
				}
				$(t).append(tbody);
				this.addCellProp();
				this.addRowProp();
				if(p.checkbox) {
					this.selectAllItemRow();
					this.selectItemRow();
				}
				this.rePosDrag();
				tbody = null;
				data = null;
				i = null;
				if (p.onSuccess) {
					p.onSuccess(this);
				}
				if (p.hideOnSubmit) {
					$(g.block).remove();
				}
				this.hDiv.scrollLeft = this.bDiv.scrollLeft;
				if (browser.opera) {
					$(t).css('visibility', 'visible');
				}
				var time2 = new Date().getTime();
			//	alert(time2-time1);
			},
			changeSort: function (th) { //change sortorder
				if (this.loading) {
					return true;
				}
				$(g.nDiv).hide();
				$(g.nBtn).hide();
				if (p.sortname == $(th).attr('abbr')) {
					if (p.sortorder == 'asc') {
						p.sortorder = 'desc';
					} else {
						p.sortorder = 'asc';
					}
				}
				$(th).addClass('sorted').siblings().removeClass('sorted');
				$('.sdesc', this.hDiv).removeClass('sdesc');
				$('.sasc', this.hDiv).removeClass('sasc');
				$('div', th).addClass('s' + p.sortorder);
				p.sortname = $(th).attr('abbr');
				p.sortType = $(th).attr('sortType');
				if (p.onChangeSort) {
					p.lstTableData = [];
					$('tr', this.bDiv).each(function () {
						var obj = {};
						var trInfo = $(this).prop('outerHTML');//当前tr
						obj.trInfos = trInfo;
						$('td', this).each(function(){
							var isSort = $(this).attr('abbr');
							if(p.sortname == isSort){
								obj[isSort] = $('span',this).html();//排序用
							}
						});
						p.lstTableData.push(obj);
					});
//					// console.log(p.lstTableData);
					//降序(数字<字符串<中文)
					p.lstTableData.sort(function  sortInfo(data1, data2) {
						//先判断是否在线，在判断是否停车，在线排在前面
						//如果两个参数均为字符串类型
						var paramVals = p.sortname;
						var compareType = p.sortType;
						if(compareType == 'number'){//需要比较数字
							var str1 = (data1[paramVals]).toString();//传入数据 可能类型为       45.2 公里/小时
							var str2 = (data2[paramVals]).toString();//传入数据
							var num1 = parseFloat(str1);//number(),parseInt(),parseFloat()
							var num2 = parseFloat(str2);
					        if(num1 > num2) return 1;
					        if(num1 == num2) return 0;
					        if(num1 < num2) return -1;
						}
						var bnum1 = Number(data1[paramVals]);
						var bnum2 = Number(data2[paramVals]);
					    if(!bnum1 && !bnum2){
					    	var Regx = /^[A-Za-z0-9]*$/;
					    	var flag1 = Regx.test(data1[paramVals]); //字母
					    	var flag2 = Regx.test(data2[paramVals]);
							if(flag1 || flag2) {//按字母排序
								if(flag1 && !flag2) {
									return -1;
								}
								if(!flag1 && flag2) {
									return 1;
								}
								if(flag1 && flag2) {
									var str1 = (data1[paramVals]).toLowerCase();
									var str2 = (data2[paramVals]).toLowerCase();
									if(str1 > str2) return 1;
						            if(str1 == str2) return 0;
						            if(str1 < str2) return -1;
								}
							}
					        return data1[paramVals].localeCompare(data2[paramVals], "zh");
					    }
					    //如果参数1为数字，参数2为字符串
					    if(bnum1 && !bnum2){
					        return -1;
					    }
					    //如果参数1为字符串，参数2为数字
					    if(!bnum1 && bnum2){
					        return 1;
					    }
					    //如果两个参数均为数字
					    if(bnum1 && bnum2){
					    	var num1 = parseInt(data1[paramVals], 10);
							var num2 = parseInt(data2[paramVals], 10);
					        if(num1> num2) return 1;
					        if(num1 == num2) return 0;
					        if(num1 < num2) return -1;
					    }
					});
					if(p.sortorder == 'asc'){
						p.lstTableData.reverse();
					}
					if(p.checkbox) {
						$('table tr .selectAllItem', this.hDiv)[0].checked = false;
					}
					$('tr, a, td, div', t).unbind();
					$(t).empty();
					p.pages = 1;
					p.page = 1;
					this.buildpager();
					$('.pPageStat', this.pDiv).html(p.nomsg);
                    if (p.onSuccess) p.onSuccess(this);
					if (p.hideOnSubmit) {
						$(this.block).remove();
					}
					this.showThisDiv('block','block','block','block','block','block');
					//追加
					for(var index = 0 ; index < p.lstTableData.length ;index++ ){
						$(t).append(p.lstTableData[index].trInfos);
					}
					this.addRowProp();
				} else {
					this.populate();//发请求到后台
				}
			},
			buildpager: function () { //rebuild pager based on new properties
				$('.pcontrol input', this.pDiv).val(p.page);
				$('.pcontrol span', this.pDiv).html(p.pages);
				var r1 = p.total == 0 ? 0 : (p.page - 1) * p.rp + 1;
				var r2 = r1 + p.rp - 1;
				if (p.total < r2) {
					r2 = p.total;
				}
				var stat = p.pagestat;
				stat = stat.replace(/{from}/, r1);
				stat = stat.replace(/{to}/, r2);
				stat = stat.replace(/{total}/, p.total);
				$('.pPageStat', this.pDiv).html(stat);
			},
			populate: function () { //get latest data  排序数据
//				this.disableForm(true);
				this.showLoading(true);
				if (this.loading) {
					return true;
				}
				if (p.onSubmit) {
					if (!p.newp) {
						p.newp = 1;
					}
					if (p.page > p.pages) {
						p.page = p.pages;
					}
					var gh = p.onSubmit(this);
					if (!gh) {
//						this.disableForm(false);
						this.showLoading(false);
						return false;
					}
				}
				this.loading = true;
				if (!p.url) {
//					this.disableForm(false);
					this.showLoading(false);
					this.loading = false;
					return false;
				}
				$('.pPageStat', this.pDiv).html(p.procmsg);
				$('.pReload', this.pDiv).addClass('loading');
				$(g.block).css({
					top: g.bDiv.offsetTop
				});
				if (p.hideOnSubmit) {
					$(this.gDiv).prepend(g.block);
				}
				if (browser.opera) {
					$(t).css('visibility', 'hidden');
				}
				if (!p.newp) {
					p.newp = 1;
				}
				if (p.page > p.pages) {
					p.page = p.pages;
				}
				
				var pagination = {currentPage: p.newp, pageRecords: p.rp};
				var pagin = encodeURIComponent(JSON.stringify(pagination));
				if(p.qtype == 'devIdno') {
					p.query = gpsGetVehicleIdno(p.query) == '' ? p.query : gpsGetVehicleIdno(p.query);
				}
				
				var param = [{
					name: 'page',
					value: p.newp
				}, {
					name: 'rp',
					value: p.rp
				}, /*{
					name: 'sortname',
					value: p.sortname
				}, {
					name: 'sortorder',
					value: p.sortorder
				},*/ {
					name: 'query',
					value: p.query
				}, {
					name: 'qtype',
					value: p.qtype
				}, {
					name: 'pagin',
					value: pagin
				}];
				if (p.params.length) {
					for (var pi = 0; pi < p.params.length; pi++) {
						var params_ = p.params[pi];
						if(params_ && (params_.name != 'sortname' && params_.name != 'sortorder')){
							param.push(params_);
						}
//						param[param.length] = p.params[pi];
					}
					if(p.sortData){
						p.sortData.sortname = p.sortname;
						p.sortData.sortorder = p.sortorder;
					}
				}
				
				if(p.sortname && p.sortorder){//优先使用点击后的
					console.log(" p.sortorder:"+p.sortname +"___"+ p.sortorder);
					param.push({
						name: 'sortname',
						value: p.sortname
					});
					param.push({
						name: 'sortorder',
						value: p.sortorder
					});
				}else if(p.sortname_ && p.sortorder_){//没有使用重载后的
					console.log(" p.sortorder_:"+p.sortname_ +"___"+ p.sortorder_);
					param.push({
						name: 'sortname',
						value: p.sortname_
					});
					param.push({
						name: 'sortorder',
						value: p.sortorder_
					});
				}
				$.ajax({
					type: p.method,
					url: p.url,
					data: param,
					dataType: p.dataType,
					success: function (data) {
						if(data.result == 0){
							g.addData(data);
//							g.disableForm(false);
							g.showLoading(false);
							// 如果是生态眼项目，屏蔽通用版本车辆参数
							if(parent.myUserRole && parent.myUserRole.isSTY) {
								var list = ['plateType','startSpeed','endSpeed','startPosition','endPosition','industryType'];
								hideTableColList(list);
							}
						}else if (data.result == 2) {
							showErrorMessage(data.result);
							//直接跳转到登录界面
							top.window.location = "login.html";
						} else {
//							g.disableForm(false);
							g.showLoading(false);
                            $('.pPageStat', this.pDiv).html(p.nomsg);
							showErrorMessage(data.result);
							$('.pReload', this.pDiv).removeClass('loading');
							g.loading = false;
						//	alert(parent.lang.errException);
						}
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						try {
							if (p.onError) p.onError(XMLHttpRequest, textStatus, errorThrown);
						} catch (e) {}
//						g.disableForm(false);
						g.showLoading(false);
                        $('.pPageStat', this.pDiv).html(p.nomsg);
						$('.pReload', this.pDiv).removeClass('loading');
						g.loading = false;
					}
				});
			},//获取距离body的上边距
			getTop: function(e){
				var offset = 0;
				var obj = e;
				while(obj != null && obj != document.body) {
					offset += obj.offsetTop;
					obj = obj.offsetParent;
				}
				while(obj != null && e != document.body) {
					offset -= e.scrollTop;
					e = e.parentElement;
				}
				return offset;
			},//获取距离body的左边距
			getLeft: function(e){
				var offset = 0;
				var obj = e;
				while(obj != null && obj != document.body) {
					offset += obj.offsetLeft;
					obj = obj.offsetParent;
				}
				while(e != null && e != document.body) {
					offset -= e.scrollLeft;
					e = e.parentElement;
				}
				return offset;
			},//页面遮盖
			showLoading : function(flag) {
				if(flag) {
					if(!($('.lockmask-flexgrid', 'body') && $('.lockmask-flexgrid', 'body').get(0))) {
						var isBody = true;
						var width = $('body').width();
						var	height = $('body').height();
						if(width == 0) {
							width = $(window).width();
						}
						if(height == 0) {
							height = $(window).height();
						}
						var top = g.getTop($('body').get(0));
						var left = g.getLeft($('body').get(0));
						
						if(height < 42) {
							top += (height - 42) / 2;
						}else {
							top += (height - 42) * 0.3;
						}
						left += (width - 106) / 2;
						var content = '<div class="lockmask-flexgrid">';
						if(isBody) {
							content += '<div class="lockmask-top-flexgrid" style="width: 100%; height: 100%;"></div>';
							if(width == 0) {
								content += '<div class="lockmask-content-flexgrid" style="left: 40%; top: 30%">';
							}else {
								content += '<div class="lockmask-content-flexgrid" style="left: '+left+'px; top: '+top+'px;">';
							}
						}else {
							content += '<div class="lockmask-top-flexgrid" style="width: '+width+'px; height: '+height+'px;"></div>';
							content += '<div class="lockmask-content-flexgrid" style="left: '+left+'px; top: '+top+'px;">';
						}
						content += '<div class="lockmask-loading-flexgrid">'+_getRootFrameElement().lang.loading+'</div>';
						content += '</div>';
						content += '</div>';
						$('body').append(content);
					}
				}else {
					if($('.lockmask-flexgrid', 'body') && $('.lockmask-flexgrid', 'body')[0]) {
						$($('.lockmask-flexgrid', 'body')[0]).remove();
					}
				}
			},
			doSearch: function () {
				p.query = $('input[name=q]', g.sDiv).val();
				p.qtype = $('select[name=qtype]', g.sDiv).val();
				p.newp = 1;
				this.populate();
			},
			changePage: function (ctype) { //change page
				if (this.loading) {
					return true;
				}
				switch (ctype) {
					case 'first':
						if(p.pages && p.newp && p.page) {
							p.newp = 1;
						}
						break;
					case 'prev':
						if (p.page > 1) {
							p.newp = parseInt(p.page, 10) - 1;
						}
						break;
					case 'next':
						if (p.page < p.pages) {
							p.newp = parseInt(p.page, 10) + 1;
						}
						break;
					case 'last':
						if(p.pages && p.newp && p.page) {
							p.newp = p.pages;
						}
						break;
					case 'input':
						var nv = parseInt($('.pcontrol input', this.pDiv).val(), 10);
						if (isNaN(nv)) {
							nv = 1;
						}
						if (nv < 1) {
							nv = 1;
						} else if(!p.pages) {
							nv = 1;
						} else if (nv > p.pages) {
							nv = p.pages;
						}
						$('.pcontrol input', this.pDiv).val(nv);
						if(p.pages && p.newp && p.page) {
							p.newp = nv;
						}
						break;
				}
				if (p.newp == p.page || !p.page || !p.newp || !p.pages) {
					return false;
				}
				if (p.onChangePage) {
					p.onChangePage(p.newp);
				} else {
					this.populate();
				}
			},
			addCellProp: function () {
				$('tbody tr td', g.bDiv).each(function () {
					if(!$(this).find('div').html()) {
						var tdDiv = document.createElement('div');
						var n = $('td', $(this).parent()).index(this);
						var pth = $('th:eq(' + n + ')', g.hDiv).get(0);
						if (pth != null) {
							if (p.sortname == $(pth).attr('abbr') && p.sortname) {
								this.className = 'sorted';
							}
							$(tdDiv).css({
								textAlign: pth.align,
								width: $('div:first', pth)[0].style.width
							});
							if (pth.hidden) {
								$(this).css('display', 'none');
							}
						}
						if (p.nowrap == false) {
							$(tdDiv).css('white-space', 'normal');
						}
						if (this.innerHTML == '') {
							this.innerHTML = '&nbsp;';
						}
						tdDiv.innerHTML = this.innerHTML;
						var prnt = $(this).parent()[0];
						var pid = false;
						if (prnt.id) {
							pid = prnt.id.substr(3);
						}
						if (pth != null) {
							if (pth.process) pth.process(tdDiv, pid);
						}
						$(this).empty().append(tdDiv).removeAttr('width'); //wrap content
						g.addTitleToCell(tdDiv);
					}
				});
			},
			getCellDim: function (obj) {// get cell prop for editable event
				var ht = parseInt($(obj).height(), 10);
				var pht = parseInt($(obj).parent().height(), 10);
				var wt = parseInt(obj.style.width, 10);
				var pwt = parseInt($(obj).parent().width(), 10);
				var top = obj.offsetParent.offsetTop;
				var left = obj.offsetParent.offsetLeft;
				var pdl = parseInt($(obj).css('paddingLeft'), 10);
				var pdt = parseInt($(obj).css('paddingTop'), 10);
				return {
					ht: ht,
					wt: wt,
					top: top,
					left: left,
					pdl: pdl,
					pdt: pdt,
					pht: pht,
					pwt: pwt
				};
			},
			addRowProp: function () {
				$('tbody tr', g.bDiv).on('click', function (e) {
					var obj = (e.target || e.srcElement);
					if (obj.href || obj.type) return true;
					if (e.ctrlKey || e.metaKey) {
						// mousedown already took care of this case
						return;
					}
					if(p.clickRowDefault) {
						if(p.checkbox && !$(this).find("td .selectItem")[0].disabled) {
							if($(this).hasClass('trSelected')){
								$(this).find("td .selectItem")[0].checked = false;
							}else {
								$(this).find("td .selectItem")[0].checked = true;
							}
						}
					}
					
					if(p.clickRowCenter) {
						$(g.bDiv).scrollTop(g.getTop(this) - g.getTop(g.bDiv) - $(g.bDiv).height()/2);
					}
					
					if(p.clickRowDefault) {
						if(p.singleSelect) {
							$(this).addClass('trSelected');
						}else {
							$(this).toggleClass('trSelected');
						}
					
						if (p.singleSelect && ! g.multisel) {
							$(this).siblings().removeClass('trSelected');
							if(p.checkbox  && !$(this).find("td .selectItem")[0].disabled) {
								$(this).find("td .selectItem")[0].checked = false;
							}
						}
					
						if(p.checkbox) {
							var checkAll = true;
							$('tbody tr .selectItem', g.bDiv).each(function(){
								if($(this).val() != "" && !this.checked)	{
									checkAll = false;
								}
							});
							
							if (checkAll) {
								$('table tr .selectAllItem', g.hDiv)[0].checked = true;
							} else {
								$('table tr .selectAllItem', g.hDiv)[0].checked = false;
							}
						}
					}
					if (typeof p.selectRowProp == "function") {
						p.selectRowProp(this);
					}
				}).on('mousedown', function (e) {
					if (e.shiftKey) {
						$(this).toggleClass('trSelected');
						g.multisel = true;
						this.focus();
						$(g.gDiv).noSelect();
					}
					if (e.ctrlKey || e.metaKey) {
						$(this).toggleClass('trSelected');
						g.multisel = true;
						this.focus();
					}
				}).on('mouseup', function (e) {
					if (g.multisel && ! (e.ctrlKey || e.metaKey)) {
						g.multisel = false;
						$(g.gDiv).noSelect(false);
					}
					if (typeof p.mouseUpRowProp == "function") {
						p.mouseUpRowProp(this, e);
					}
				}).on('dblclick', function (e) {
					if (p.onDoubleClick) {
						p.onDoubleClick(this, e, g, p);
					}
				}).hover(function (e) {
					if (g.multisel && e.shiftKey) {
						$(this).toggleClass('trSelected');
					}
				}, function () {});
				if (browser.msie && browser.version < 7.0) {
					$(this).hover(function () {
						$(this).addClass('trOver');
					}, function () {
						$(this).removeClass('trOver');
					});
				}
			},

			combo_flag: true,
			combo_resetIndex: function(selObj)
			{
				if(this.combo_flag) {
					selObj.selectedIndex = 0;
				}
				this.combo_flag = true;
			},
			combo_doSelectAction: function(selObj)
			{
				eval( selObj.options[selObj.selectedIndex].value );
				selObj.selectedIndex = 0;
				this.combo_flag = false;
			},
			//Add title attribute to div if cell contents is truncated
			addTitleToCell: function(tdDiv) {
				if(p.addTitleToCell) {
					var $span = $('<span />').css('display', 'none'),
						$div = (tdDiv instanceof jQuery) ? tdDiv : $(tdDiv),
						div_w = $div.outerWidth(),
						span_w = 0;

					$('body').children(':first').before($span);
					$span.html($div.html());
					$span.css('font-size', '' + $div.css('font-size'));
					$span.css('padding-left', '' + $div.css('padding-left'));
					span_w = $span.innerWidth();
					$span.remove();

					if(span_w > div_w) {
						$div.attr('title', $div.text());
					} else {
						$div.removeAttr('title');
					}
				}
			},
			autoResizeColumn: function (obj) {
				if(!p.dblClickResize) {
					return;
				}
				var n = $('div', this.cDrag).index(obj),
					$th = $('th:visible div:eq(' + n + ')', this.hDiv),
					ol = parseInt(obj.style.left, 10),
					ow = $th.width(),
					nw = 0,
					nl = 0,
					$span = $('<span />');
				$('body').children(':first').before($span);
				$span.html($th.html());
				$span.css('font-size', '' + $th.css('font-size'));
				$span.css('padding-left', '' + $th.css('padding-left'));
				$span.css('padding-right', '' + $th.css('padding-right'));
				nw = $span.width();
				$('tr', this.bDiv).each(function () {
					var $tdDiv = $('td:visible div:eq(' + n + ')', this),
						spanW = 0;
					$span.html($tdDiv.html());
					$span.css('font-size', '' + $tdDiv.css('font-size'));
					$span.css('padding-left', '' + $tdDiv.css('padding-left'));
					$span.css('padding-right', '' + $tdDiv.css('padding-right'));
					spanW = $span.width();
					nw = (spanW > nw) ? spanW : nw;
				});
				$span.remove();
				nw = (p.minWidth > nw) ? p.minWidth : nw;
				nl = ol + (nw - ow);
				$('div:eq(' + n + ')', this.cDrag).css('left', nl);
				this.colresize = {
					nw: nw,
					n: n
				};
				g.dragEnd();
			},
			selectItemRow: function() {
				$('tbody tr .selectItem', g.bDiv).unbind('click');
				$('tbody tr .selectItem', g.bDiv).bind('click', function () {
					$(this).parent('div').parent('td').parent('tr').toggleClass('trSelected');
					var checkAll = true;
					$('tbody tr .selectItem', g.bDiv).each(function(){
						if($(this).val() != "" && !this.checked)	{
							checkAll = false;
						}
					});
					if (checkAll) {
						$('table tr .selectAllItem', g.hDiv)[0].checked = true;
					} else {
						$('table tr .selectAllItem', g.hDiv)[0].checked = false;
					}
					if (typeof p.clickCheckBox == "function") {
						p.clickCheckBox(this);
					}
//					if (typeof p.selectRowProp == "function") {
//						p.selectRowProp($(this).parent('div').parent('td').parent('tr').get(0));
//					}
				});
			},
			selectAllItemRow: function() {
				$('table tr .selectAllItem', g.hDiv).unbind('click');
				$('table tr .selectAllItem', g.hDiv).bind('click', function () {
					if(this.checked) {
						$('tbody tr', g.bDiv).each(function() {
							if(!$('.selectItem',this)[0].checked && !$('.selectItem',this)[0].disabled) {
								$('.selectItem',this)[0].checked = true;
							}
							$(this).addClass("trSelected");
							if (typeof p.selectRowProp == "function") {
								p.selectRowProp(this, 'selAll');
							}
						});
					}else {
						$('tbody tr', g.bDiv).each(function() {
							if($('.selectItem',this)[0].checked && !$('.selectItem',this)[0].disabled) {
								$('.selectItem',this)[0].checked = false;
							}
							$(this).removeClass("trSelected");
							if (typeof p.selectRowProp == "function") {
								p.selectRowProp(this, 'delAll');
							}
						});
					}
//					if(this.checked) {
//						$('tbody tr .selectItem', g.bDiv)[0].checked = true;//全选
//						$('tbody tr', g.bDiv).addClass("trSelected");
//					}else {
//						$('tbody tr .selectItem', g.bDiv)[0].checked = false;////全不选
//						$('tbody tr', g.bDiv).removeClass("trSelected");
//					}
				});
			},
			addUsepager : function() {
				// add pager
				if (p.usepager) {
					g.pDiv.className = 'pDiv';
					g.pDiv.innerHTML = '<div class="pDiv2"></div>';
					$(g.bDiv).after(g.pDiv);
					var html = ' <div class="pGroup"> <div class="pFirst pButton"><span></span></div><div class="pPrev pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"><span class="pcontrol">' + p.pagefrom + ' <input type="text" size="4" value="1" /> ' +p.pagetext +'&nbsp&nbsp'+ p.pagetotal + ' <span> 1 </span>' + p.pagetext + '</span></div> <div class="btnseparator"></div> <div class="pGroup"> <div class="pNext pButton"><span></span></div><div class="pLast pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"> <div class="pReload pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"><span class="pPageStat"></span></div>';
					$('div', g.pDiv).html(html);
					$('.pReload', g.pDiv).click(function () {
						if(p.pages && p.newp && p.page) {
							p.newp = p.page;
							g.populate();
						}
					});
					$('.pFirst', g.pDiv).click(function () {
						g.changePage('first');
					});
					$('.pPrev', g.pDiv).click(function () {
						g.changePage('prev');
					});
					$('.pNext', g.pDiv).click(function () {
						g.changePage('next');
					});
					$('.pLast', g.pDiv).click(function () {
						g.changePage('last');
					});
					$('.pcontrol input', g.pDiv).keydown(function (e) {
						if (e.keyCode == 13) { 
							g.changePage('input');
						}
					});
					if (browser.msie && browser.version < 7) $('.pButton', g.pDiv).hover(function () {
						$(this).addClass('pBtnOver');
					}, function () {
						$(this).removeClass('pBtnOver');
					});
					if (p.useRp) {
						var opt = '',
							sel = '';
						for (var nx = 0; nx < p.rpOptions.length; nx++) {
							if (p.rp == p.rpOptions[nx]) sel = 'selected="selected"';
							else sel = '';
							opt += "<option value='" + p.rpOptions[nx] + "' " + sel + " >" + p.rpOptions[nx] + "&nbsp;&nbsp;</option>";
						}
						$('.pDiv2', g.pDiv).prepend("<div class='pGroup'><span> " + p.pernumber + " </span><select name='rp'>" + opt + "</select></div> <div class='btnseparator'></div>");
						$('select', g.pDiv).change(function () {
							if (p.onRpChange) {
								p.onRpChange(+this.value);
							} else {
								p.rp = +this.value;
								if(p.pages && p.page) {
									p.newp = 1;
									g.populate();
								}
							}
						});
					}
					//add search button
					if (p.searchitems) {
						$('.pDiv2', g.pDiv).prepend("<div class='pGroup'> <div class='pSearch pButton'><span></span></div> </div>  <div class='btnseparator'></div>");
						$('.pSearch', g.pDiv).click(function () {
							$(g.sDiv).slideToggle('fast', function () {
								$('.sDiv:visible input:first', g.gDiv).trigger('focus');
							});
						});
						//add search box
						g.sDiv.className = 'sDiv';
						var sitems = p.searchitems;
						var sopt = '', sel = '';
						for (var s = 0; s < sitems.length; s++) {
							if (p.qtype === '' && sitems[s].isdefault === true) {
								p.qtype = sitems[s].name;
								sel = 'selected="selected"';
							} else {
								sel = '';
							}
							sopt += "<option value='" + sitems[s].name + "' " + sel + " >" + sitems[s].display + "&nbsp;&nbsp;</option>";
						}
						if (p.qtype === '') {
							p.qtype = sitems[0].name;
						}
						$(g.sDiv).append("<div class='sDiv2'>" + p.findtext +
								" <input type='text' value='" + p.query +"' size='30' name='q' class='qsbox' /> "+
								" <select name='qtype'>" + sopt + "</select></div>");
						//Split into separate selectors because of bug in jQuery 1.3.2
						$('input[name=q]', g.sDiv).keydown(function (e) {
							if (e.keyCode == 13) {
								g.doSearch();
							}
						});
						$('select[name=qtype]', g.sDiv).keydown(function (e) {
							if (e.keyCode == 13) {
								g.doSearch();
							}
						});
						$('input[value=Clear]', g.sDiv).click(function () {
							$('input[name=q]', g.sDiv).val('');
							p.query = '';
							g.doSearch();
						});
						$(g.bDiv).after(g.sDiv);
					}
				}
				$(g.pDiv, g.sDiv).append("<div style='clear:both'></div>");
			},
			showThisDiv : function(mDiv,hDiv,bDiv,pDiv,vDiv,rDiv) {
				$(g.mDiv, g.gDiv).css('display',mDiv);  //标题
				$(g.hDiv, g.gDiv).css('display',hDiv);  //表头
				$(g.bDiv, g.gDiv).css('display',bDiv);	//数据
				$(g.pDiv, g.gDiv).css('display',pDiv);	//页栏
				$(g.vDiv, g.gDiv).css('display',vDiv);	//底部伸缩栏
				$(g.rDiv, g.gDiv).css('display',rDiv);  //右部伸缩栏
				
			},
			getCdpad : function() {
				var cdcol = $('thead tr:first th:first', g.hDiv).get(0);
		        if(cdcol !== null) {
					g.cdpad = 0;
	                g.cdpad += (isNaN(parseInt($('div', cdcol).css('borderLeftWidth'), 10)) ? 0 : parseInt($('div', cdcol).css('borderLeftWidth'), 10));
	                g.cdpad += (isNaN(parseInt($('div', cdcol).css('borderRightWidth'), 10)) ? 0 : parseInt($('div', cdcol).css('borderRightWidth'), 10));
	                g.cdpad += (isNaN(parseInt($('div', cdcol).css('paddingLeft'), 10)) ? 0 : parseInt($('div', cdcol).css('paddingLeft'), 10));
	                g.cdpad += (isNaN(parseInt($('div', cdcol).css('paddingRight'), 10)) ? 0 : parseInt($('div', cdcol).css('paddingRight'), 10));
	                g.cdpad += (isNaN(parseInt($(cdcol).css('borderLeftWidth'), 10)) ? 0 : parseInt($(cdcol).css('borderLeftWidth'), 10));
	                g.cdpad += (isNaN(parseInt($(cdcol).css('borderRightWidth'), 10)) ? 0 : parseInt($(cdcol).css('borderRightWidth'), 10));
	                g.cdpad += (isNaN(parseInt($(cdcol).css('paddingLeft'), 10)) ? 0 : parseInt($(cdcol).css('paddingLeft'), 10));
	                g.cdpad += (isNaN(parseInt($(cdcol).css('paddingRight'), 10)) ? 0 : parseInt($(cdcol).css('paddingRight'), 10));
		        }
			},
			pager: 0
		};
        
        g = p.getGridClass(g); //get the grid class
        
		if (p.colModel) { //create model if any
			thead = document.createElement('thead');
			var tr = document.createElement('tr');
			if(p.checkbox) {
				var cth = $('<th/>');
				var cthch = $('<input type=\"checkbox\" name=\"selectAllItem\" class=\"selectAllItem\"/>'); 
				cthch.addClass("noborder"); 
				cth.addClass("cth").attr({ 'axis': "col-1", width: "22", "isch": true }).append(cthch); 
				$(tr).append(cth); 
			}
			for (var i = 0; i < p.colModel.length; i++) {
				var th = document.createElement('th');
				$(th).attr('axis', 'col' + i);
				var cm = p.colModel[i];
				if( cm ) {	// only use cm if its defined
					if ($.cookies) {
						var cookie_width = 'flexiwidths/'+cm.name;		// Re-Store the widths in the cookies
						if( $.cookie(cookie_width) != undefined ) {
							cm.width = $.cookie(cookie_width);
						}
					}
					if( cm.display != undefined ) {
						th.innerHTML = cm.display;
					}
					if (cm.sortname && cm.sortable) {
						$(th).attr('abbr', cm.sortname);
					}
					if(cm.sortType) {
						$(th).attr('sortType', cm.sortType);
					}
					if(cm.name) {
						$(th).addClass(cm.name);
					}
					if (cm.align) {
						th.align = cm.align;
					}
					if (cm.width) {
						$(th).attr('width', cm.width);
					}
					if ($(cm).attr('hide')) {
						th.hidden = true;
					}
					if (cm.process) {
						th.process = cm.process;
					}
				}  else {
					th.innerHTML = "";
					$(th).attr('width',22);
				}
				$(tr).append(th);
			}
			$(thead).append(tr);
			$(t).prepend(thead);
		} // end if p.colmodel
		//init divs
		g.gDiv = document.createElement('div'); //create global container
		g.mDiv = document.createElement('div'); //create title container
		g.hDiv = document.createElement('div'); //create header container
		g.bDiv = document.createElement('div'); //create body container
		g.vDiv = document.createElement('div'); //create grip
		g.rDiv = document.createElement('div'); //create horizontal resizer
		g.cDrag = document.createElement('div'); //create column drag
		g.block = document.createElement('div'); //creat blocker
		g.nDiv = document.createElement('div'); //create column show/hide popup
		g.nBtn = document.createElement('div'); //create column show/hide button
		g.iDiv = document.createElement('div'); //create editable layer
		g.tDiv = document.createElement('div'); //create toolbar
		g.sDiv = document.createElement('div');
		g.pDiv = document.createElement('div'); //create pager container
        
        if(p.colResize === false) { //don't display column drag if we are not using it
            $(g.cDrag).css('display', 'none');
        }
        
		if (!p.usepager) {
			g.pDiv.style.display = 'none';
		}
		g.hTable = document.createElement('table');
		g.gDiv.className = 'flexigrid';
//		if (p.width != 'auto') {
//			g.gDiv.style.width = p.width + (isNaN(p.width) ? '' : 'px');
//		} 
		if (p.width!='auto') { 
		    if (p.width.toString().indexOf('%')>0) 
		         g.gDiv.style.width = p.width; 
			else 
				g.gDiv.style.width = p.width + (isNaN(p.width) ? '' : 'px'); 
		} 
		
		//add conditional classes
		if (browser.msie) {
			$(g.gDiv).addClass('ie');
		}
		if (p.novstripe) {
			$(g.gDiv).addClass('novstripe');
		}
		$(t).before(g.gDiv);
		$(g.gDiv).append(t);
		//set toolbar
		if (p.buttons) {
			g.tDiv.className = 'tDiv';
			g.tDiv2 = document.createElement('div');
			g.tDiv2.className = 'tDiv2';
			for (var i = 0; i < p.buttons.length; i++) {
				var btn = p.buttons[i];
				if (!btn.separator) {
					var btnDiv = document.createElement('div');
					btnDiv.className = 'fbutton';
					btnDiv.innerHTML = ("<div><span>") + (btn.hidename ? "&nbsp;" : btn.name) + ("</span></div>");
					if (btn.bclass) $('span', btnDiv).addClass(btn.bclass).css({
						paddingLeft: 20
					});
					if (btn.bimage) // if bimage defined, use its string as an image url for this buttons style (RS)
						$('span',btnDiv).css( 'background', 'url('+btn.bimage+') no-repeat center left' );
						$('span',btnDiv).css( 'paddingLeft', 20 );

					if (btn.tooltip) // add title if exists (RS)
						$('span',btnDiv)[0].title = btn.tooltip;

					btnDiv.onpress = btn.onpress;
					btnDiv.name = btn.name;
					if (btn.id) {
						btnDiv.id = btn.id;
					}
					if (btn.onpress) {
						$(btnDiv).click(function () {
							this.onpress(this.id || this.name, g.gDiv);
						});
					}
					$(g.tDiv2).append(btnDiv);
					if (browser.msie && browser.version < 7.0) {
						$(btnDiv).hover(function () {
							$(this).addClass('fbOver');
						}, function () {
							$(this).removeClass('fbOver');
						});
					}
				} else {
					if(btn.audio){
						$(g.tDiv2).append("<audio  id=\"audioPlay\"   controls=\"controls\"></audio>");
					}else{
						$(g.tDiv2).append("<div class='btnseparator'></div>");
					}
					
				}
			}
			$(g.tDiv).append(g.tDiv2);
			$(g.tDiv).append("<div style='clear:both'></div>");
			$(g.gDiv).prepend(g.tDiv);
		}
		g.hDiv.className = 'hDiv';

		// Define a combo button set with custom action'ed calls when clicked.
		if( p.combobuttons && $(g.tDiv2) )
		{
			var btnDiv = document.createElement('div');
			btnDiv.className = 'fbutton';

			var tSelect = document.createElement('select');
//			$(tSelect).change( function () { g.combo_doSelectAction( tSelect ) } );
//			$(tSelect).click( function () { g.combo_resetIndex( tSelect) } );
			
			$(tSelect).change( function () { p.combobuttons.onchange( tSelect.value ) } );
			tSelect.className = 'cselect';
			$(btnDiv).append(tSelect);
			
			var comboboxs = p.combobuttons.comboboxs;
			for (i=0;i<comboboxs.length;i++)
			{
				var btn = comboboxs[i];
				if (!btn.separator)
				{
					var btnOpt = document.createElement('option');
					btnOpt.innerHTML = btn.name;

					if (btn.bclass)
						$(btnOpt)
						.addClass(btn.bclass)
						.css({paddingLeft:20})
						;
					if (btn.bimage)  // if bimage defined, use its string as an image url for this buttons style (RS)
						$(btnOpt).css( 'background', 'url('+btn.bimage+') no-repeat center left' );
						$(btnOpt).css( 'paddingLeft', 20 );

					if (btn.tooltip) // add title if exists (RS)
						$(btnOpt)[0].title = btn.tooltip;

					if (btn.onpress != null)
					{
						btnOpt.value = btn.onpress;
					}
					$(tSelect).append(btnOpt);
				}
			}
			$(g.tDiv2).append(btnDiv);
		}


		$(t).before(g.hDiv);
		g.hTable.cellPadding = 0;
		g.hTable.cellSpacing = 0;
		$(g.hDiv).append('<div class="hDivBox"></div>');
		$('div', g.hDiv).append(g.hTable);
		var thead = $("thead:first", t).get(0);
		if (thead) $(g.hTable).append(thead);
		thead = null;
		if (!p.colmodel) var ci = 0;
		$('thead tr:first th', g.hDiv).each(function () {
			var thdiv = document.createElement('div');
			if ($(this).attr('abbr')) {
				$(this).click(function (e) {
//					if (!$(this).hasClass('thOver')) return false;
					var obj = (e.target || e.srcElement);
					if (obj.href || obj.type) return true;
					g.changeSort(this);
				});
				if ($(this).attr('abbr') == p.sortname) {
					this.className = 'sorted';
					thdiv.className = 's' + p.sortorder;
				}
			}

			if (this.hidden) {
				$(this).hide();
			}
			if (!p.colmodel) {
				$(this).attr('axis', 'col' + ci++);
			}
			
			// if there isn't a default width, then the column headers don't match
			// i'm sure there is a better way, but this at least stops it failing
			if (this.width == '') {
				this.width = 100;
			}
			
			$(thdiv).css({
				textAlign: this.align,
				width: this.width + 'px'
			});
			thdiv.innerHTML = this.innerHTML;
			$(this).empty().append(thdiv).removeAttr('width').mousedown(function (e) {
				if($(this).find("input").attr("type") == 'checkbox') {
						return;
				}
				g.dragStart('colMove', e, this);
			}).hover(function () {
				if($(this).find("input").attr("type") == 'checkbox') {
						return;
				}
				if (!g.colresize && !$(this).hasClass('thMove') && !g.colCopy) {
					$(this).addClass('thOver');
				}
				if ($(this).attr('abbr') != p.sortname && !g.colCopy && !g.colresize && $(this).attr('abbr')) {
					$('div', this).addClass('s' + p.sortorder);
				} else if ($(this).attr('abbr') == p.sortname && !g.colCopy && !g.colresize && $(this).attr('abbr')) {
					var no = (p.sortorder == 'asc') ? 'desc' : 'asc';
					$('div', this).removeClass('s' + p.sortorder).addClass('s' + no);
				}
				if (g.colCopy) {
					var n = $('th', g.hDiv).index(this);
					if (n == g.dcoln) {
						return false;
					}
					if (n < g.dcoln) {
						$(this).append(g.cdropleft);
					} else {
						$(this).append(g.cdropright);
					}
					g.dcolt = n;
				} else if (!g.colresize) {
					var nv = $('th:visible', g.hDiv).index(this);
					var onl = parseInt($('div:eq(' + nv + ')', g.cDrag).css('left'), 10);
					var nw = jQuery(g.nBtn).outerWidth();
					var nl = onl - nw + Math.floor(p.cgwidth / 2);
					$(g.nDiv).hide();
					$(g.nBtn).hide();
					
					$(g.nBtn).css({
					'left': nl,
						top: g.hDiv.offsetTop
					}).show();							
					var ndw = parseInt($(g.nDiv).width(), 10);
					$(g.nDiv).css({
						top: g.bDiv.offsetTop - 1
					});
					if ((nl + ndw) > $(g.gDiv).width()) {
						$(g.nDiv).css('left', onl - ndw + 1);
					} else {
						$(g.nDiv).css('left', nl);
					}
					if ($(this).hasClass('sorted')) {
						$(g.nBtn).addClass('srtd');
					} else {
						$(g.nBtn).removeClass('srtd');
					}
				}
			}, function () {
				if($(this).find("input").attr("type") == 'checkbox') {
						return;
				}
				$(this).removeClass('thOver');
				if ($(this).attr('abbr') != p.sortname) {
					$('div', this).removeClass('s' + p.sortorder);
				} else if ($(this).attr('abbr') == p.sortname) {
					var no = (p.sortorder == 'asc') ? 'desc' : 'asc';
					$('div', this).addClass('s' + p.sortorder).removeClass('s' + no);
				}
				if (g.colCopy) {
					$(g.cdropleft).remove();
					$(g.cdropright).remove();
					g.dcolt = null;
				}
			}); //wrap content
		});
		//set bDiv
		g.bDiv.className = 'bDiv';
		$(t).before(g.bDiv);
		$(g.bDiv).css({
//			height: (p.height == 'auto') ? 'auto' : p.height + "px"
			height: (p.height=='auto') ? 'auto' : p.height+ 
				(p.height.toString().indexOf('%')>0 ? "":"px")
		}).scroll(function (e) {
			g.scroll()
		}).append(t);
		if (p.height == 'auto') {
			$('table', g.bDiv).addClass('autoht');
		}
		//add td & row properties
		g.addCellProp();
		g.addRowProp();
		if(p.checkbox) {
			g.selectAllItemRow();
			g.selectItemRow();
		}
        //set cDrag only if we are using it
        if (p.colResize === true) {
            var cdcol = $('thead tr:first th:first', g.hDiv).get(0);
            if(cdcol !== null) {
                g.cDrag.className = 'cDrag';
                g.getCdpad();
                $(g.bDiv).before(g.cDrag);
                var cdheight = $(g.bDiv).height();
                var hdheight = $(g.hDiv).height();
                $(g.cDrag).css({
                    top: -hdheight + 'px'
                });
                $('thead tr:first th', g.hDiv).each(function(i) {
                    var cgDiv = document.createElement('div');
                    $(g.cDrag).append(cgDiv);
                    if (!p.cgwidth) {
                        p.cgwidth = $(cgDiv).width() == 0 ? 5 : $(cgDiv).width();
                    }
                    var cgHeight = (cdheight + hdheight) == 0 ? 24 : (cdheight + hdheight);
                    $(cgDiv).height(cgHeight);
                    $(cgDiv).mousedown(function(e) {
                        g.dragStart('colresize', e, this);
                    }).dblclick(function(e) {
                        g.autoResizeColumn(this);
                    });
                    if (browser.msie && browser.version < 7.0) {
                        g.fixHeight($(g.gDiv).height());
                        $(cgDiv).hover(function() {
                            g.fixHeight();
                            $(this).addClass('dragging');
                        }, function() {
                            if(!g.colresize) {
                                $(this).removeClass('dragging');
                            }
                        });
                    }
                });
            }
        }
		//add strip
		if (p.striped) {
			$('tbody tr:odd', g.bDiv).addClass('erow');
		}
		if (p.resizable && p.height != 'auto') {
			g.vDiv.className = 'vGrip';
			$(g.vDiv).mousedown(function (e) {
				g.dragStart('vresize', e);
			}).html('<span></span>');
			$(g.bDiv).after(g.vDiv);
		}
		if (p.resizable && p.width != 'auto' && !p.nohresize) {
			g.rDiv.className = 'hGrip';
			$(g.rDiv).mousedown(function (e) {
				g.dragStart('vresize', e, true);
			}).html('<span></span>').css('height', $(g.gDiv).height());
			if (browser.msie && browser.version < 7.0) {
				$(g.rDiv).hover(function () {
					$(this).addClass('hgOver');
				}, function () {
					$(this).removeClass('hgOver');
				});
			}
			$(g.gDiv).append(g.rDiv);
		}

		g.addUsepager();

		// add title
		if (p.title) {
			g.mDiv.className = 'mDiv';
			g.mDiv.innerHTML = '<div class="ftitle">' + p.title + '</div>';
			$(g.gDiv).prepend(g.mDiv);
			if (p.showTableToggleBtn) {
				$(g.mDiv).append('<div class="ptogtitle" title="Minimize/Maximize Table"><span></span></div>');
				$('div.ptogtitle', g.mDiv).click(function () {
					$(g.gDiv).toggleClass('hideBody');
					$(this).toggleClass('vsble');
				});
			}
		}
		//setup cdrops
		g.cdropleft = document.createElement('span');
		g.cdropleft.className = 'cdropleft';
		g.cdropright = document.createElement('span');
		g.cdropright.className = 'cdropright';
		//add block
		g.block.className = 'gBlock';
		var gh = $(g.bDiv).height();
		var gtop = g.bDiv.offsetTop;
		$(g.block).css({
			width: g.bDiv.style.width,
			height: gh,
			background: 'white',
			position: 'relative',
			marginBottom: (gh * -1),
			zIndex: 1,
			top: gtop,
			left: '0px'
		});
		$(g.block).fadeTo(0, p.blockOpacity);
		// add column control
		if ($('th', g.hDiv).length) {
			g.nDiv.className = 'nDiv';
			g.nDiv.innerHTML = "<table cellpadding='0' cellspacing='0'><tbody></tbody></table>";
			$(g.nDiv).css({
				marginBottom: (gh * -1),
				display: 'none',
				top: gtop
			}).noSelect();
			var cn = 0;
			$('th div', g.hDiv).each(function () {
				var kcol = $("th[axis='col" + cn + "']", g.hDiv)[0];
				var chk = 'checked="checked"';
				if (kcol.style.display == 'none') {
					chk = '';
				}
				var text = this.innerHTML;
				var type = $(this).find("input").attr("type");
				if(type == 'checkbox') {
					cn++;
					return;
				}
				$('tbody', g.nDiv).append('<tr><td class="ndcol1"><input type="checkbox" ' + chk + ' class="togCol" value="' + cn + '" /></td><td class="ndcol2">' + text + '</td></tr>');
			//	if(type == 'checkbox') {
			//		$('tbody', g.nDiv).find('tr').hide();
			//	}
				cn++;
			});
			if (browser.msie && browser.version < 7.0) $('tr', g.nDiv).hover(function () {
				$(this).addClass('ndcolover');
			}, function () {
				$(this).removeClass('ndcolover');
			});
			$('td.ndcol2', g.nDiv).click(function () {
				if ($('input:checked', g.nDiv).length <= p.minColToggle && $(this).prev().find('input')[0].checked) return false;
				return g.toggleCol($(this).prev().find('input').val());
			});
			$('input.togCol', g.nDiv).click(function () {
				if ($('input:checked', g.nDiv).length < p.minColToggle && this.checked === false) return false;
				$(this).parent().next().trigger('click');
			});
			$(g.gDiv).prepend(g.nDiv);
			$(g.nBtn).addClass('nBtn')
				.html('<div></div>')
				.attr('title', top.lang.hideShowColumns)
				.click(function () {
					$(g.nDiv).toggle();
					return true;
				}
			);
			if (p.showToggleBtn) {
				$(g.gDiv).prepend(g.nBtn);
			}
		}
		// add date edit layer
		$(g.iDiv).addClass('iDiv').css({
			display: 'none'
		});
		$(g.bDiv).append(g.iDiv);
		// add flexigrid events
		$(g.bDiv).hover(function () {
			$(g.nDiv).hide();
			$(g.nBtn).hide();
		}, function () {
			if (g.multisel) {
				g.multisel = false;
			}
		});
		$(g.gDiv).hover(function () {}, function () {
			$(g.nDiv).hide();
			$(g.nBtn).hide();
		});
		//add document events
		$(document).mousemove(function (e) {
			g.dragMove(e);
		}).mouseup(function (e) {
			g.dragEnd();
		}).hover(function () {}, function () {
			g.dragEnd();
		});
		//browser adjustments
		if (browser.msie && browser.version < 7.0) {
			$('.hDiv,.bDiv,.mDiv,.pDiv,.vGrip,.tDiv, .sDiv', g.gDiv).css({
				width: '100%'
			});
			$(g.gDiv).addClass('ie6');
			if (p.width != 'auto') {
				$(g.gDiv).addClass('ie6fullwidthbug');
			}
		}
		g.rePosDrag();
		g.fixHeight();
		//make grid functions accessible
		t.p = p;
		t.grid = g;
		// load data
		if (p.url && p.autoload) {
			g.populate();
		}else {
			g.showThisDiv('block','block','block','block','block','block');
		}
		return t;
	};
	var docloaded = false;
	$(document).ready(function () {
		docloaded = true;
	});
	$.fn.flexigrid = function (p) {//填充表格样式
		return this.each(function () {
			if (!docloaded) {
				$(this).hide();
				var t = this;
				$(document).ready(function () {
					$.addFlex(t, p);
				});
			} else {
				$.addFlex(this, p);
			}
		});
	}; //end flexigrid
	$.fn.flexReload = function (p) { // function to reload grid
		return this.each(function () {
			if (this.grid && this.p.url) this.grid.populate();
		});
	}; //end flexReload
	$.fn.flexOptions = function (p) { //function to update general options
		return this.each(function () {
			if (this.grid) $.extend(this.p, p);
		});
	}; //end flexOptions
	$.fn.flexToggleCol = function (cid, visible) { // function to reload grid
		return this.each(function () {
			if (this.grid) this.grid.toggleCol(cid, visible);
		});
	}; //end flexToggleCol
	$.fn.flexAddData = function (data,type) { // function to add data to grid
		return this.each(function () {
			if (this.grid) this.grid.addData(data,type);
		});
	};
	$.fn.flexAddDataRowJson = function (data,type) { // function to add data to grid
		return this.each(function () {
			if (this.grid) this.grid.addDataRowJson(data,type);
		});
	};
	$.fn.flexAppendRowJson = function (rows, head) { // function append data to grid, afu 150531
		return this.each(function () {
			if (this.grid) this.grid.appendJsonData(rows, head);
		});
	};
	$.fn.flexRemoveRow = function (rowid) { // function append data to grid, afu 150531
		return this.each(function () {
			if (this.grid) this.grid.removeRow(rowid);
		});
	};
	
	$.fn.flexGetRowid = function (id) { // function to reload grid
		return "#row" + id;
	}; //end flexReload
	$.fn.flexGetParams = function() {
		var param = {};
		this.each(function () {
			if (this.grid) {
				if(this.p.rp != null) {
					param.rp = this.p.rp;
				}
				if(this.p.page != null) {
					param.page = this.p.page;
					param.total = this.p.total;
					param.newp = this.p.newp == null ? 1 : this.p.newp;
				}
			}
		});
		return param;
	}
	$.fn.noSelect = function (p) { //no select plugin by me :-)
		var prevent = (p === null) ? true : p;
		if (prevent) {
			return this.each(function () {
				if (browser.msie || browser.safari) $(this).bind('selectstart', function () {
					return false;
				});
				else if (browser.mozilla) {
					$(this).css('MozUserSelect', 'none');
					$('body').trigger('focus');
				} else if (browser.opera) $(this).bind('mousedown', function () {
					return false;
				});
				else $(this).attr('unselectable', 'on');
			});
		} else {
			return this.each(function () {
				if (browser.msie || browser.safari) $(this).unbind('selectstart');
				else if (browser.mozilla) $(this).css('MozUserSelect', 'inherit');
				else if (browser.opera) $(this).unbind('mousedown');
				else $(this).removeAttr('unselectable', 'on');
			});
		}
	}; //end noSelect
	$.fn.flexSearch = function(p) { // function to search grid
		return this.each( function() { if (this.grid&&this.p.searchitems) this.grid.doSearch(); });
	}; //end flexSearch
	$.fn.flexClear = function(p) { // function to clear grid
		return this.each( function() { if (this.grid) this.grid.addData({}); });
	}; //end flexClear
	$.fn.selectedRows = function (p) { // Returns the selected rows as an array, taken and adapted from http://stackoverflow.com/questions/11868404/flexigrid-get-selected-row-columns-values
		var arReturn = [];
		var arRow = [];
		var selector = $(this.selector + ' .trSelected');
		$(selector).each(function (i, row) {
			arRow = [];
			var idr = $(row).data('id');
			var name = row.name;
			$.each(row.cells, function (c, cell) {
				var col = cell.abbr;
				var val = cell.firstChild.innerHTML;
				if (val == '&nbsp;') val = '';      // Trim the content
        		var idx = cell.cellIndex;                

				arRow.push({
					Column: col,        // Column identifier
					Value: val,         // Column value
					CellIndex: idx,     // Cell index
					RowIdentifier: idr,  // Identifier of this row element
					name: name
				});
			});
			arReturn.push(arRow);
		});
		return arReturn;
	};
	//按列名称查找值
	$.fn.getColValueByName = function(cols, colName) {
		   var retVal = '';
		   var param = $.grep(cols, function (e) {
		    var found = e.Column == colName;
		    if (found != null && found != undefined & found) {
		        retVal = e.Value;
		    }
		});
		   return retVal;
	}
	
	//获取勾选中的复选框值
	$.fn.selectedCheckedRows = function (p) { // Returns the selected rows as an array, taken and adapted from http://stackoverflow.com/questions/11868404/flexigrid-get-selected-row-columns-values
		var arReturn = [];
		var selector = $(this.selector + ' .selectItem');
		$(selector).each(function (i, row) {
			if(row.checked && !row.disabled) {
				var idr = $(row).val();
				arReturn.push(idr);
			}
		});
		return arReturn;
	};
	//外部填充表格方法
	$.fn.flexSetFillCellFun = function(fillCell) {
		return this.each(function () {
			if (this.grid) this.grid.setFillCellFun(fillCell);
		});
	}
	//外部添加选择行事件
	$.fn.flexSelectRowPropFun = function(selectRow) {
		return this.each(function () {
			if (this.grid) this.grid.selectRowPropFun(selectRow);
		});
	}
	//外部添加选择行事件
	$.fn.flexClickCheckBoxFun = function(clickCheckBox) {
		return this.each(function () {
			if (this.grid) this.grid.clickCheckBoxFun(clickCheckBox);
		});
	}
	//外部添加选择行鼠标事件
	$.fn.flexMouseUpRowPropFun = function(mouseUpRow) {
		return this.each(function () {
			if (this.grid) this.grid.mouseUpRowPropFun(mouseUpRow);
		});
	}
	//外部获取加载的数据
	$.fn.flexGetData = function() {
		var data = null;
		this.each(function () {
			if (this.grid) data = this.grid.getData();
		});
		return data;
	}
	$.fn.flexFixHeight = function() {
		return this.each(function () {
			if (this.grid) this.grid.fixHeight();
		});
	}  
	//填充表格
	var fixCellInfos = function(p, row, idx, index) {
		var pos = "";
		try {
			pos = fillCellInfo(p, row, idx, index);
		}catch(e) {
			pos = row[name];
		}
		return pos;
	};
})(jQuery);