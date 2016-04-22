
(function ($) {      
    $.fn.date = function (options,Ycallback,Ncallback) {   
        //插件默认选项
        var that = $(this);
        var docType = $(this).is('input');
        var datetime = false;
        var nowdate = new Date();
        var indexY=1,indexM=1,indexD=1;
        var initY=parseInt((nowdate.getFullYear()));
        var initM=parseInt(nowdate.getMonth()+"");
        var initD=parseInt(nowdate.getDate()+"");
        var yearScroll=null,monthScroll=null,dayScroll=null;
        $.fn.date.defaultOptions = {
            beginyear:2000,                 //日期--年--份开始
            endyear:2020,                   //日期--年--份结束
            beginmonth:1,                   //日期--月--份结束
            endmonth:12,                    //日期--月--份结束
            beginday:1,                     //日期--日--份结束
            endday:31,                      //日期--日--份结束
            curdate:true,                   //打开日期是否定位到当前日期
            theme:"date",                    //控件样式（1：日期，2：日期+时间）
            mode:null,                       //操作模式（滑动模式）
            event:"click",                    //打开日期插件默认方式为点击后后弹出日期 
            show:true
        }
        //用户选项覆盖插件默认选项   
        var opts = $.extend( true, {}, $.fn.date.defaultOptions, options );
        if(opts.theme === "datetime"){datetime = true;}
        if(!opts.show){
            that.unbind('click');
        }
        else{
            //绑定事件（默认事件为获取焦点）
            that.bind(opts.event,function () {
                createUL();      //动态生成控件显示的日期
                init_iScrll();   //初始化iscrll
                extendOptions(); //显示控件
                that.blur();
                refreshDate();
                bindButton();
            })  
        };
        function refreshDate(){
            yearScroll.refresh();
            monthScroll.refresh();
            dayScroll.refresh();
            resetInitDete();
            yearScroll.goToPage(0, indexY, 100);
            monthScroll.goToPage(0, indexM, 100);
            dayScroll.goToPage(0, indexD, 100);
        }
        
        //当前日期
        function resetInitDete(){
           
            if(that.val()===""){
                if(opts.curdate){
                indexY=initY-opts.beginyear;
                indexM=initM;
                indexD=initD-1; 
                }else{
                indexY=1;
                indexM=1;
                indexD=1;  
                }
               
            }else{
                timearr= that.val().split("-");
                indexY = timearr[0]-opts.beginyear;
                indexM = timearr[1]-1;
                indexD = timearr[2]-1;
            }
        }
        //显示在表单里的内容
        function bindButton(){
            // resetIndex();
            $("#dateconfirm").unbind('click').click(function () {	
                textM=indexM<10?"0"+indexM:indexM;
                textD=indexD<10?"0"+indexD:indexD;  
                var datestr = indexY-1+opts.beginyear+"-"+textM +"-"+textD;
                if(Ycallback===undefined){
                     if(docType){that.val(datestr);}else{that.html(datestr);}
                }else{
                    Ycallback(datestr);
                }
                timeya();
                $("#datePage").hide(); 
                $("#dateshadow").hide();
            });
            $("#datecancle").click(function () {
                $("#datePage").hide(); 
		  $("#dateshadow").hide();
            });
        }		
        function extendOptions(){
            $("#datePage").show(); 
            $("#dateshadow").show();
        }
        //日期滑动
        function init_iScrll() { 
            yearScroll = new IScroll("#yearwrapper",{click: true,snap:"li",scrollX:false});
            yearScroll.on('scrollEnd', function (){
                indexY = this.currentPage.pageY+1;
            $("#daywrapper ul").html(createDAY_UL());
            });

            monthScroll = new IScroll("#monthwrapper",{snap:"li",click: true,scrollX:false});
            monthScroll.on('scrollEnd', function (){
                indexM = this.currentPage.pageY+1;
                $("#daywrapper ul").html(createDAY_UL());
            });

            dayScroll = new IScroll("#daywrapper",{snap:"li",click: true,scrollX:false});
            dayScroll.on('scrollEnd', function (){
                indexD = this.currentPage.pageY+1;
            });
        }
    
        //日期+时间滑动
        
        function  createUL(){
            CreateDateUI();
            $("#yearwrapper ul").html(createYEAR_UL());
            $("#monthwrapper ul").html(createMONTH_UL());
            $("#daywrapper ul").html(createDAY_UL());
        }
        function CreateDateUI(){
            var str = ''+
                '<div id="dateshadow"></div>'+
                '<div id="datePage" class="page">'+
                    '<section>'+
                        '<div id="datetitle"><h1>请选择日期</h1></div>'+
                        '<div id="datemark"><a id="markyear"></a><a id="markmonth"></a><a id="markday"></a></div>'+
                        '<div id="timemark"><a id="markhour"></a><a id="markminut"></a><a id="marksecond"></a></div>'+
                        '<div id="datescroll">'+
                            '<div id="yearwrapper">'+
                                '<ul></ul>'+
                            '</div>'+
                            '<div id="monthwrapper">'+
                                '<ul></ul>'+
                            '</div>'+
                            '<div id="daywrapper">'+
                                '<ul></ul>'+
                            '</div>'+
                        '</div>'+
                    '</section>'+
                    '<footer id="dateFooter">'+
                        '<div id="setcancle">'+
                            '<ul>'+
                                '<li id="dateconfirm">确定</li>'+
                                '<li id="datecancle">取消</li>'+
                            '</ul>'+
                        '</div>'+
                    '</footer>'+
                '</div>'
            $("#datePlugin").html(str);
        }
        function addTimeStyle(){
            $("#datePage").css("height","380px");
            $("#datePage").css("top","60px");
            $("#yearwrapper").css("position","absolute");
            $("#yearwrapper").css("bottom","200px");
            $("#monthwrapper").css("position","absolute");
            $("#monthwrapper").css("bottom","200px");
            $("#daywrapper").css("position","absolute");
            $("#daywrapper").css("bottom","200px");
        }
        //按钮白色是否可跳转
        function timeya(){
            var begintime=document.getElementById("begintime").value;
            var endtime=document.getElementById("endtime").value;
            // console.log(begintime);
            // console.log(endtime);
            var sumb=document.getElementById("sumb");
            if(begintime.length!=0&&endtime.length!=0&&begintime<endtime){
                  sumb.className ="on";
                  
            }else{
                sumb.className ="";
                
            }
        }
        //创建 --年-- 列表
        function createYEAR_UL(){
            var str="<li>&nbsp;</li>";
            for(var i=opts.beginyear; i<=opts.endyear;i++){
                str+='<li>'+i+'年</li>';
            }
            return str+"<li>&nbsp;</li>";
        }
        //创建 --月-- 列表
        function createMONTH_UL(){
            var str="<li>&nbsp;</li>";
            for(var i=opts.beginmonth;i<=opts.endmonth;i++){
                if(i<10){
                    i="0"+i;
                }
                str+='<li>'+i+'月</li>';
            }
            return str+"<li>&nbsp;</li>";
        }
        //创建 --日-- 列表
        function createDAY_UL(){
            $("#daywrapper ul").html("");
            if(indexM==4||indexM==6||indexM==9||indexM==11){
               opts.endday=30; 
            }
            else if(indexM==2){
                var years=indexY-1+opts.beginyear;
               if((years%4==0 && years%100!=0)||(years%100==0 && years%400==0)){
                opts.endday=29;
                } else{
                opts.endday=28;  
                }
            }else{
              opts.endday=31;    
            }
            var str="<li>&nbsp;</li>";
                for(var i=opts.beginday;i<=opts.endday;i++){
                    if(i<10){
                    i="0"+i;
                }
                str+='<li>'+i+'日</li>';
            }
            return str+"<li>&nbsp;</li>";                     
        }
    }
})(jQuery);  
