<?php
$user = 'admin'; // ตัวแปร PHP
$pass = 'admin';
$devid = '888888';
$ip = 'tod-office2.ddns.net';
echo '<script type="text/javascript">';
echo "var user = '$user';"; // ส่งค่า $data จาก PHP ไปยังตัวแปร data ของ Javascript
echo "var pass = '$pass';";
echo "";
echo '</script>';

?>


<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>MDVR Playback</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    
    
    <link href="http://tod-office2.ddns.net:8080/bootstrap/css/button.css" type="text/css" rel="stylesheet">
    <link rel='stylesheet' type='text/css' media='screen' href='https://bootswatch.com/4/lux/bootstrap.min.css'>
    <link rel="stylesheet" type="text/css" href="flexigrid.css">
    <link href=" http://tod-office2.ddns.net:8080/808gps/open/css/video.css" type="text/css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="http://tod-office2.ddns.net:8080/808gps/css/labelIcon.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    
    
    <script type="text/javascript" src="flexigrid.js"></script>
    <script type="text/javascript" src="http://tod-office2.ddns.net:8080/808gps/open/player/swfobject.js"></script>


    <script type="text/javascript" src="http://tod-office2.ddns.net:8080/js/lhgdialog.min.js"></script>
    <script type="text/javascript" src="http://tod-office2.ddns.net:8080/js/public.js"></script>
    <script type="text/javascript" src="http://tod-office2.ddns.net:8080/808gps/js/myajax.js"></script>
    <script type="text/javascript" src="http://tod-office2.ddns.net:8080/808gps/js/hashtable.js"></script>
    

   
    <style type="text/css">
		.flexigrid .bDiv a {
			margin: 0px 10px;
			outline: 0 none;
			text-decoration: none;
			cursor: pointer;
		}

		.flexigrid {
			overflow: visible;
        }
        
    </style>
    



    
    <script src="videoplayer.js"></script>
     
    
    
</head>

<body >
    
<div id="flashExample" style="overflow: hidden; height: 800px; width:800px;">
		<div id="cmsv6flash"></div>
		<a class="title" id="videoLangTitle" style="display: none;">插件语言：</a>
		<select style="width: 140px;display: none;" class="languagePath">
    		<option>en.xml</option>
    		<option>cn.xml</option>
    	</select>
		<a style="margin-left: 20px;display: none;" class="button button-primary button-rounded button-small settings"
			onclick="setVideoLanguage()">设置</a>
	</div>
	<div id="operateExample" style="position:absolute;width: 800px;">
		<!--  用户登录开始 -->
		
    

    
    <button id="getjsessionapi" class="btn btn-danger"> get Jsession from API</button> 
    <button type="button" class="btn btn-secondary" title="" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." data-original-title="Popover Title">Right</button>
    <div id="output" class="jumbotron" hidden>Your Jsession will be here</div>
    <div id="output2" class="jumbotron" style="position:relative; left:20px; top:2px;">Your Car List will be here</div>
    <!--
    <div id="outputxx" class="jumbotron"></div> 
-->


    <div>
        <table>
            <tr>
                <td> <label> CAR: </label> </td>
                <td>
                    <select id="test" onchange="ChangeList()" style="width:100px;">
                        <option> ---Car--- </option>
                    </select>
                </td>

                <td><label for="meeting-time" style="width:100px; text-align: center">Video Start:</label></td>
                <td><input type="datetime-local" id="meeting-time" name="meeting-time" value="2018-06-12T19:30" min="2019-06-07T00:00" max="2019-09-31T00:00" onclick="time_start()"></td>
                <td> <label for="ending-time" style="width:50px;  text-align: center;">  TO  :</label></td>
                <td> <input type="datetime-local" id="ending-time" name="meeting-time" value="2018-06-12T20:30" min="2019-06-07T00:00" max="2019-09-31T00:00" onclick="time_end()"></td>
            </tr>
        </table>
    </div>

    <div id="fileLocation" class="custom-control custom-radio" style="line-height:30px; ">
        <div>
            <a id="filelocation" class="title">File Location:</a>
            <label>
                <input id="wjwz-device" type="radio" checked="" value="1" name="FileLocation" onchange="checkRadioValue()">
                <span id="spanDevice" class="title">TerminalEquipment</span>
            </label>
            <label>
                <input id="wjwz-storage" type="radio" value="2" name="FileLocation" onchange="checkRadioValue()">
                <span id="spanStorageServer" class="title">StorageServer</span>
            </label>
            <label>
                <input id="wjwz-download" type="radio" value="4" name="FileLocation" onchange="checkRadioValue()">
                <span id="spanDownloadServer" class="title">DownloadServer</span>
            </label>

        </div>





        <!-- <hr>
        <div id="result"></div>
        <hr> -->

        <div>
            <a id="filetype" class="title">File Type:</a>
            <label>
                <input id="wjlx-video" type="radio" checked="" value="2" name="FileType" onchange="checkFiletype()">
                <span id="spanVideoType">Videotape</span>
            </label>
        </div>
        <!-- <hr>
        <div id="Fileresult"></div>
        <hr> -->

        <div>
            <a id="VideoType">Video Type:</a>
            <label>
                <input id="lxlx-normal" type="radio" value="0" name="VideoType" onchange=" checkVideotype()">
                <span id="spanVideoNormal" class="title">Routine</span>
            </label>
            <label>
                <input id="lxlx-alarm" type="radio" value="1" name="VideoType" onchange=" checkVideotype()">
                <span id="spanVideoAlarm" class="title">Alarm</span>
            </label>
            <label>
                <input id="lxlx-all" type="radio" checked="" value="-1" name="VideoType" onchange=" checkVideotype()">
                <span id="spanVideoAll" class="title">All</span>
            </label>
        </div>
        <!-- <hr>
        <div id="vdoresult"></div>
        <hr> -->
    </div>

    <!--
    <div>
        <span id="labelStartTime" style="padding-left: 20px;">Start：</span>
        <input id="startTime" class="Wdate" type="text" style="width: 140px;" readonly="" size="15">
        <span id="labelEndTime" style="padding-left: 20px;">End：</span>
        <input id="endTime" class="Wdate" type="text" style="width: 140px;" readonly="" size="15">
    </div>

    -->

    <button id="search" class="btn btn-info" style="width: 192px;" onclick="Search()">Search</button>

    <h3>Output DATA</h2>
    <div id="output3" class="jumbotron" style="position:relative; left:20px; top:2px;">Your data List will be here</div>




    <h3> Query Video </h2>
        
<!--
            <h4> Query Results: </h4>
            <table border="1" style="text-align:center;">
                <th width="100" height="30"> Index </th>
                <th width="100"> Operator </th>
                <th width="100"> Time </th>
                <th width="100"> VideoType </th>
                <th width="250"> TerminalEquipment </th>
                <th width="100"> Channel </th>
                <th width="100"> FileLocation </th>
                <th width="100"> Size(MB) </th>

            </table>
    -->
        

      
        <!--
        <div style="text-align:center">
            <button onclick="playPause()">Play/Pause</button>
            <button onclick="makeBig()">Big</button>
            <button onclick="makeSmall()">Small</button>
            <button onclick="makeNormal()">Normal</button>
            <br><br>
            <video id="video1" width="420">
                <source src="mov_bbb.mp4" type="video/mp4">
                <source src="mov_bbb.ogg" type="video/ogg">
                Your browser does not support HTML5 video.
            </video>
    --> 
           
    
           

           <!-- <div id="flashExample" style=" height: 500px;"> -->


            


            <div class="playback" style="margin: 0;">
			<p id="playbackTitle">录像查询</p>
			<div class="player-params">
				<div class="player-param">
					<a id="queryresults" class="title windowIndex">查询结果：</a>
				</div>
				<div class="player-param" style="margin: 0;width: 1000px;max-height:300px;overflow: auto;">
					<textarea id="videosearch" style="width: 1000px;height:250px; display: none;" class="playbackUrl"></textarea>
					<div class="flexigrid" style="margin: 0;overflow: visible;">
						<div class="d_table map_action">
							<div class="map_drag_box">
								<i class="icon icon_drag"></i>
							</div>
							<div class="gps_box">
								<!-- 报表放这里 -->
								<ul style="list-style-type:none;margin: 0;padding:0px;">
									<!-- <li id="videoTime" class="active"></li> -->
									<li id="videoFile">
										<table id="videoFileTable"></table>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
           
  		



</body>

</html>


<script type="text/javascript">
    //document.getElementById('getjs2').addEventListener('click', getJsession2);
    document.getElementById('getjsessionapi').addEventListener('click', getJsession2);

    var jsession_ID //used
    var Account; //used
    var Spin; //for testing
    var Jx;
    var urlx
    var vehicles_id
    var concheck = 1;
    //var dynamic = [];
    var dynamic = []
    var myArray = [];
    var login_url = 'http://tod-office2.ddns.net:8080/StandardApiAction_login.action?account=admin&password=admin'
    var VideoVal = 1;
    var FileType_val = 1;
    var file_location = 1;
    var File_type = 2;
    var Video_type = 1;

    var json;
    var jsion = ""; //Used to determine whether the landing
    var ip_ = "182.52.204.163";
    var port_ = "6605";
    var isLanding = false; //To determine whether the landing
    var IsSearching = false; //To determine whether the search
    var loadTimeLine = true; //Whether to load the timeline, if the return file date error is not loaded
    var mapVehicleInfo = new Hashtable();//vehicle info
    var isInitFinished = false; //Video plug-in is loaded to complete
    var serverIp = ""; //Server IP
    var serverPort = ""; //Server Port
    var lang;
    var searchVehicle = null; //The vehicle being query




    const VideoQueryPrompt = "Related video results were not found!";

    $(function() {
        var datatime = new Date();
        $("#startTime").val(datatime.getFullYear() + "-" + (datatime.getMonth() + 1) + "-" + datatime.getDate() + " " + 0 + ":" + 0 + ":" + 0);
        $("#startTime").click(function() {
            WdatePicker({
                lang: 'zh',
                dateFmt: 'yyyy-MM-dd HH:mm:ss'
            });
        });
        $("#endTime").val(datatime.getFullYear() + "-" + (datatime.getMonth() + 1) + "-" + datatime.getDate() + " " + 23 + ":" + 59 + ":" + 59);
        $("#endTime").click(function() {
            WdatePicker({
                lang: 'zh',
                dateFmt: 'yyyy-MM-dd HH:mm:ss'
            });
        });
        lang = new langEn();
        
                //Custom header
                if (concheck == 1) {
                    lang = new langEn();
                    $('.languagePath').val('en.xml');
                    
                }
        
        
                $("#videoFileTable").flexigrid({
			url: "http://tod-office2.ddns.net:8080/StandardApiAction_queryTrackDetail.action?",					//"StandardTrackAction_query.action"
			dataType: 'json',			
			colModel : [	
				{display: lang.operator, name : 'operator', width : 100, sortable : false, align: 'center'},
				{display: lang.fileIndex, name : 'fileIndex', width : 60, sortable : false, align: 'center'},
				{display: lang.fileTime, name : 'fileTime', width : 150, sortable : false, align: 'center'},
				{display: lang.Type, name : 'type', width : 150, sortable : false, align: 'center'},
				{display: lang.spanDevice, name : 'vehiIdno', width : 150, sortable : false, align: 'center'},
				{display: lang.vehiChn, name : 'vehiChn', width : 170, sortable : false, align: 'center'},
				{display: lang.loc, name : 'loc', width : 80, sortable : false, align: 'center'},
				{display: lang.fileSize, name : 'fileSize', width : 150, sortable : false, align: 'center'},
				{display: lang.file ,name: 'file', width : 380,sortable : false, align: 'center'},
				{display: 'svr' ,name: 'svr',hide : true},
				{display: 'devIdno' ,name: 'devIdno',hide : true },
				{display: 'len' ,name: 'len',hide : true},
				{display: 'chnMask' ,name: 'chnMask',hide : true},
				{display: 'beg' ,name: 'beg',hide : true},
				{display: 'end' ,name: 'end',hide : true},
				],
			usepager: false,
			autoload: false,			
			useRp: false,				
			singleSelect: true,			
			clickRowCenter: true,		
			rp: 15,						
			showTableToggleBtn: true,	
			showToggleBtn: false,		
			width: '1300px',		
			height: 'auto',				
			resizable: false
		});
        

        loadLang();

        
         $("#videoFileTable").flexSetFillCellFun(function(p, row, idx, index) {
                    return fillVideoFileTable(p, row, idx, index);
        });
        
        //Initialize video plug ins
    
         initPlayerExample();

        $("#userLoginBtn").click(function() {
            userLogin();
        });

    });



    //Define English name
    function langEn() {
        this.videoExample = "Video Example";
        this.geSessionId = "Login";
        this.userId = "Account:";
        this.password = "Password:";
        this.login = "Login";
        this.Landing = "BeingLoggedIn";
        this.Condition = "Condition";
        this.NumberPlates = "Number Plates:";
        this.StartTime = "StartTime：";
        this.EndTime = "EndTime：";
        this.filelocation = "File Location:";
        this.spanDevice = "TerminalEquipment";
        this.spanStorageServer = "StorageServer";
        this.spanDownloadServer = "DownloadServer";
        this.filetype = "File Type:";
        this.spanVideoType = "Videotape";
        this.VideoType = "Video Type:";
        this.spanVideoNormal = "Routine";
        this.spanVideoAlarm = "Alarm";
        this.spanVideoAll = "All";
        this.search = "Search";
        this.searching = "Searching";
        this.playbackTitle = "Video Query";
        this.queryresults = "Query Results:";
        this.fileIndex = "Index";
        this.fileTime = "Time";
        this.vehiChn = "Channel";
        this.fileSize = "Size(MB)";
        this.file = "File";
        this.Type = "VideoType";
        this.loc = "FileLocation";
        this.Normal = "Normal";
        this.Alarm = "Alarm";
        this.Device = "Device";
        this.StorageServer = "StorageServer";
        this.DownloadServer = "DownloadServer";
        this.portTitle = "Port:";
        this.IPTitle = "IP:";
        this.LoginPrompt = "Login failed!";
        this.GetnumberPrompt = "Failed to get the license plate number!";
        this.NotloggedPrompt = "You are not logged in, please login!";
        this.VideoQueryPrompt = "Related video results were not found!";
        this.ServerQueryPrompt = "Related server information query failed!";
        this.download = "Download";
        this.segmentDownload = "SEG Download";
        this.video_playback = "Playback";
        this.operator = "Operator";
        this.findDownloadAddress = "Querying the download address!";
        this.search_stop = "Stop Searching";
        this.DownloadVideo = "Failed to get the download video!";
        this.allowed = "Does this browser set the allowed pop up box!"
        this.findReplayAddress = "Query playback address!";
        this.video_playback = "PlayBack";
        this.download = "Download";
        this.NullVideoFileInfo = "No video file information!";
        this.errorGetVideoFile = "Failed to obtain video file information!";
    }

    //Load control Chinese or English name
    function loadLang() {
        document.title = lang.videoExample;
        $('#getJsessionTitle').text(lang.geSessionId);
        $('#accountTitle').text(lang.userId);
        $('#passwordTitle').text(lang.password);
        $('#userLoginBtn').text(lang.login);
        $('#Condition').text(lang.Condition);
        $('#NumberPlates').text(lang.NumberPlates);
        $('#labelStartTime').text(lang.StartTime);
        $('#labelEndTime').text(lang.StartTime);
        $('#filelocation').text(lang.filelocation);
        $('#spanDevice').text(lang.spanDevice);
        $('#spanDownloadServer').text(lang.spanDownloadServer);
        $('#spanStorageServer').text(lang.spanStorageServer);
        $('#filetype').text(lang.filetype);
        $('#spanVideoType').text(lang.spanVideoType);
        $('#VideoType').text(lang.VideoType);
        $('#spanVideoNormal').text(lang.spanVideoNormal);
        $('#spanVideoAlarm').text(lang.spanVideoAlarm);
        $('#spanVideoAll').text(lang.spanVideoAll);
        $('#search').text(lang.search);
        $('#playbackTitle').text(lang.playbackTitle);
        $('#queryresults').text(lang.queryresults);
        $('#portTitle').text(lang.portTitle);
        $('#IPTitle').text(lang.IPTitle);
    }

    function fillVideoFileTable(p, row, idx, index) {
        var name = p.colModel[idx].name;
        var ret = "";
        if (name == 'fileIndex') {
            ret = row.id + 1;
        } else if (name == 'fileTime') {
            var fileRealDate = getFileTime(row.year, row.mon, row.day);
            var relBeg = row.beg;
            var relEnd = row.end;
            var beginDate = fileRealDate + ' ' + second2ShortHourEx(row.beg);
            var endDate = fileRealDate + ' ' + second2ShortHourEx(row.end);
            var timeTitle = row.beginDate + ' - ' + second2ShortHourEx(row.end);
            ret = timeTitle;
        } else if (name == 'vehiIdno') {
            ret = row.vehiIdno;
        } else if (name == 'type') {
            if (row.type == "0") {
                ret = lang.Normal;
            } else {
                ret = lang.Alarm;
            }
        } else if (name == 'vehiChn') {
            ret = row.chnName;
        } else if (name == 'loc') {
            if (row.loc == 1) {
                ret = lang.Device;
            } else if (row.loc == 2) {
                ret = lang.StorageServer;
            } else if (row.loc == 4) {
                ret = lang.DownloadServer;
            }
        } else if (name == 'fileSize') {
            ret = (row.len / 1024 / 1024).toFixed(2) + 'MB';
        } else if (name == 'file') {
            ret = row.file;
        } else if (name == 'operator') {
            ret = '<a class="downLoad" onclick="downloadVideoFile(' + row['id'] + ');" title="' + lang.download + '"></a>';
            ret += '<a class="playback" onclick="videoFileReplay(this,' + row['id'] + ');" title="' + lang.video_playback + '"></a>';
            return ret;
        } else if (name == 'svr') {
            ret = row.svr;
        } else if (name == 'devIdno') {
            ret = row.devIdno;
        } else if (name == 'len') {
            ret = row.len;
        } else if (name == 'chnMask') {
            ret = row.chnMask;
        } else if (name == 'end') {
            ret = row.end;
        } else if (name == 'beg') {
            ret = row.beg;
        }
        return ret;
    };









    function getJsession2() {
        fetch(login_url)
            .then((res) => res.json())
            .then((data) => {

                //var jsx = data.jsession
                //var acc = data.account_name
                jsession_ID = data.jsession //used
                Account = data.account_name //used
                json = jsession_ID
                jsion = jsession_ID

                document.getElementById('output').innerHTML = jsession_ID;
                return data2 = data
                return Account

                return jsession_ID
            })
            .then((DevID) => {

                //console.log(Account)
                //console.log("Jsession_id Latest" + jsession_ID)
                let url = ('http://tod-office2.ddns.net:8080/StandardApiAction_queryUserVehicle.action?jsession=' + jsession_ID)
                console.log(DevID)

                console.log("ip=" + ip_)
                console.log("port_=" + port_)
                console.log("jsession_ID=" + jsession_ID)
                return urlx = url
            })
            .then((VeID) => {

                getVehicle_ID()
                console.log("=========================")
                console.log(vehicles_id)

                


            })
                  
    }

    function getVehicle_ID() {
        fetch(urlx)
            .then((res) => res.json())
            .then((data) => {

                var company_id = data.companys[0].id
                //console.log(company_id)
                vehicles_id = data.vehicles[0].nm
                console.log("vehicles_id " + vehicles_id)
                myArray.push(vehicles_id)
                
                let output2 = '<h2>Cars List</h2>';
                output2 += ` 
                <ul>
                    <li><b>ID:</b> ${vehicles_id}</li>
                    
                </ul>
                    `;
                document.getElementById('output2').innerHTML = output2;
                $vehicles_id_x = vehicles_id
                console.log("LOG")
                let output
                for (let i = 0; i < myArray.length; i++) {
                output += "<option value =" + myArray[i] + ">" + myArray[i] + "</option>";
                }
                document.getElementById("test").innerHTML = output;
                return vehicles_id
                return dynamic
            })
    }

    function loadMapVehicleInfo(vehicles) {
        for (var i = 0; i < vehicles.length; i++) {
            var vehicle = {};
            vehicle.idno = vehicles[i].nm.toString();
            if (vehicles[i].dl != null) {
                if (vehicles[i].dl.length == 1) {
                    var device_ = vehicles[i].dl[0];
                    var device = {};
                    device.idno = device_.id.toString();
                    var channels = [];
                    if (device_.cn != null && device_.cn != "") {
                        var chns = device_.cn.split(",");
                        for (var j = 0; j < chns.length; j++) {
                            var chn = {};
                            chn.index = j;
                            chn.name = chns[j];
                            channels.push(chn);
                        }
                    }
                    device.channels = channels;
                    vehicle.device = device;

                    mapVehicleInfo.put(vehicle.idno, vehicle);
                } else {
                    var index = 0;
                    for (var j = 0; j < vehicles[i].dl.length; j++) {
                        var device_ = vehicles[i].dl[j];
                        if ((device_.md >> 0) & 1 > 0) {
                            var device = {};
                            device.idno = device_.id.toString();
                            var channels = [];
                            if (device_.cn != null && device_.cn != "") {
                                var chns = device_.cn.split(",");
                                for (var k = 0; k < chns.length; k++) {
                                    var chn = {};
                                    chn.index = index;
                                    chn.name = chns[k];
                                    channels.push(chn);
                                    index++;
                                }
                            }
                            device.channels = channels;
                            vehicle.device = device;
                            mapVehicleInfo.put(vehicle.idno, vehicle);
                        } else {
                            if (device_.cn != null && device_.cn != "") {
                                var chns = device_.cn.split(",");
                                index = chns.length;
                            }
                        }
                    }
                }
            }
        }
    }


    function ChangeList() {
        var carList = document.getElementById("test").value;
        console.log(carList)
    }

    function time_start() {
        let time_start = document.getElementById("meeting-time").value;
        console.log(time_start)
    }

    function time_end() {
        let time_start = document.getElementById("ending-time").value;
        console.log(time_start)
    }

    function filelocation() {
        let type = document.getElementsByName('FileLocation').id;
        console.log(type)

        let file_location = document.getElementById("wjwz-storage").value;
        console.log(file_location)
    }

    function displayRadioValue() {
        var ele = document.getElementsByName('FileLocation');
        console.log(ele)
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked)
                //document.getElementById("result").innerHTML = "FileLocation: " + ele[i].value;
                console.log(ele[i].value)
        }

        //console.log(file_location)
    }

    function checkRadioValue() {
        var radios = document.getElementsByName('FileLocation');

        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                // do whatever you want with the checked radio
                alert(radios[i].value);
                file_location = radios[i].value
                // document.getElementById("result").innerHTML = "FileLocation: " + file_location;
                // only one radio can be logically checked, don't check the rest
                break;
            }
        }
        console.log("Filelocation = >", file_location);

    }

    function checkVideotype() {
        var radios = document.getElementsByName('VideoType');

        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                // do whatever you want with the checked radio
                alert(radios[i].value);
                Video_type = radios[i].value
                //console.log(VideoVal)
                // document.getElementById("vdoresult").innerHTML = "VideoType: " + VideoType_value;
                // only one radio can be logically checked, don't check the rest
                break;
            }
        }
        console.log("VideoType=", Video_type);

    }

    function checkFiletype() {
        var radios = document.getElementsByName('Filetype');

        /*for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                // do whatever you want with the checked radio
                alert(radios[i].value);
                var FileType = radios[i].value
                document.getElementById("Fileresult").innerHTML = "FileType: " + FileType;
                // only one radio can be logically checked, don't check the rest
                break;
            }
        }
        */

        File_type = 1
        //document.getElementById("Fileresult").innerHTML = "FileType: " + FileType;
        console.log("FileType", File_type);

    }




    function time_start() {
        var start_time = document.getElementById('meeting-time').value;
        console.log("Start time : >", start_time)

    }

    function Search() {

        
        if (jsession_ID == "") {
            alert("You are not logged in, please login!");
            return;
        }
        if (IsSearching == true) {
            return;
        }
        IsSearching = true;

        var number = $("#test  option:selected").text();
        var id = $("#test  option:selected").val();
        searchVehicle = number;



        var yy = document.getElementsByName('FileLocation').values
        FileType_val = document.getElementsByName('FileType').value;
        start_time = document.getElementById('meeting-time').value;
        end_time = document.getElementById('ending-time').value;

        var beginstr2 = $("#meeting-time").val();
        beginstr2 = beginstr2.replace(/-/g, "/");

        var str = beginstr2.split(" ");
        


        console.log("beginstr2::" + beginstr2)
        console.log("str::" + str)
        
        var beginstr = $("FileLocation").val();
        var start_date = new Date(start_time);
        var end_date = new Date(end_time);





        var Full_year = start_date.getFullYear();
        var Full_month = start_date.getMonth();
        var Full_date = start_date.getDate();
        var Full_Hours = start_date.getHours();
        var Full_Minutes = start_date.getMinutes();
        var Full_Seconds = start_date.getSeconds();


        var Full_year2 = end_date.getFullYear();
        var Full_month2 = end_date.getMonth();
        var Full_date2 = end_date.getDate();
        var Full_Hours2 = end_date.getHours();
        var Full_Minutes2 = end_date.getMinutes();
        var Full_Seconds2 = end_date.getSeconds();

        var format_startdate = Full_year + "-" + Full_month + "-" + Full_date + "-" + Full_Hours + "-" + Full_Minutes + "-" + Full_Seconds
        var format_startdate2 = Full_year + "-" + Full_month + "-" + Full_date + " " + Full_Hours + ":" + Full_Minutes + ":" + Full_Seconds
        var format_enddate = Full_year2 + "-" + Full_month2 + "-" + Full_date2 + " " + 0 + ":" + 0 + ":" + 0
        var format_enddate2 = Full_year2 + "-" + Full_month2 + "-" + Full_date2 + " " + Full_Hours2 + ":" + Full_Minutes2 + ":" + Full_Seconds2
        var HMS_b = Full_Hours + ":" + Full_Minutes + ":" + Full_Seconds
        var HMS_e = Full_Hours2 + ":" + Full_Minutes2 + ":" + Full_Seconds2

        //console.log("HMS_b" + HMS_b)
        //console.log("HMS_e" + HMS_e)


        // :::::::::::::::::::::: TEST :::::::::::::::::::::::::::::::
        //console.log(format_startdate2)
        //console.log(format_enddate2)



        begstr = format_startdate2.split(" ");
        endstr = format_enddate2.split(" ");
       // console.log(begstr[0] + "::2::" + begstr[1])

        var beg = shortHour2Second(begstr[1].toString());
        var end = shortHour2Second(endstr[1].toString());

      //  console.log("::::::::::::::::::::::::TEST:::::::::::::::::::::")


        //console.log(begstr)
        //console.log(begstr[1])
        //console.log(endstr)
        //console.log(endstr[1])
        //console.log("::::::::::::::::::::::::TEST:::::::::::::::::::::")



        //var testbeg=shortHour2Second(begstr[1].toString());
        var temp = begstr[1].split(":")
        let parx = parseInt(20.0)

        /*
                console.log("HERE your result")
                console.log(parx)
                console.log("beg"+beg)
        */
        //console.log(testbeg)
        var strx = format_startdate.split("-");



        var radioFileLocation = $('input:radio[name="FileLocation"]:checked').val();
        var radioFileType = $('input:radio[name="FileType"]:checked').val();
        var radioVideoType = $('input:radio[name="VideoType"]:checked').val();


        //console.log("824:::::::::" + radioFileLocation);



        var param = [];
        param.push({      name: 'MediaType',            value: 2
        });
        param.push({            name: 'DownType',            value: 2
        });
        param.push({            name: 'jsession',            value: jsession_ID
        });

        if (radioFileLocation != 1) { //PASS
            param.push({
                name: 'DevIDNO',
                value: searchVehicle.toString()
            });
            
        } else {
            param.push({
                name: 'DevIDNO',
                value: searchVehicle.toString()
            });
            //console.log("x::::::::::::Else"+radioFileLocation)
        }

        param.push({
            name: 'Location',
            value: Number(radioFileLocation)
        });
/*
        console.log("xxxxxxxx840xxxxxxxxxxxx")
        console.log("param ::" + param[0].value)
        console.log("param ::" + param[1].value)
        console.log("param ::" + param[2].value)
        console.log("param ::" + param[3].value)
*/
        $.ajax({
            type: 'POST',
            url: '//' + ip_ + ':' + port_ + '/3/1/callback=getData',
            data: param,
            cache: false,
            dataType: 'jsonp',
            success: getData = function(data) {
                console.log(data)
                console.log("911")
                console.log(param)
                if (data.result == 0) {
                    console.log("xxxAJAXxx")
                    console.log(json)
                    serverIp = data.server.clientIp;
                    serverPort = data.server.clientPort;

                    var param2 = [];
                    param2.push({
                        name: 'DownType',
                        value: 2
                    });
                    param2.push({
                        name: 'jsession',
                        value: json
                    });
                    if (radioFileLocation != 1) {
                        param2.push({
                            name: 'DevIDNO',
                            value: number.toString()
                        });
                        console.log("AJAX")

                    } else {
                        param2.push({
                            name: 'DevIDNO',
                            value: id.toString()
                        });
                        console.log("AJAX 1007")
                        console.log(param2)
                        console.log(json)

                    }
                    param2.push({ name: 'LOC',value: Number(radioFileLocation) });
                    param2.push({ name: 'CHN',value: -1 });
                    param2.push({ name: 'YEAR',value: Number(Full_year) });
                    param2.push({
                        name: 'MON',
                        value: Number(Full_month)
                    });
                    param2.push({
                        name: 'DAY',
                        value: Number(Full_date)
                    });
                    param2.push({
                        name: 'RECTYPE',
                        value: Number(radioVideoType)
                    });
                    param2.push({
                        name: 'FILEATTR',
                        value: Number(radioFileType)
                    });
                    param2.push({
                        name: 'BEG',
                        value: beg
                    });
                    param2.push({
                        name: 'END',
                        value: end
                    });
                    $.ajax({
                        type: 'POST',
                        url: '//' + serverIp + ':' + serverPort + '/3/5/callback=getData', //callback from device 
                        data: param2,
                        cache: false,
                        dataType: 'jsonp',
                        success: getData = function(json) {
                            console.log("1065")
                            $("#videoFileTable tr").remove();
                            if (data.result == 0) {
                                console.log("quering")
                                console.log(param2)
                                console.log(json)
                                addVideoFileInfo(json);
                            } else {
                                alert(VideoQueryPrompt);
                            }
                            IsSearching = false;
                            $("#search").text("> > > SEARCHING > > >");
                        }
                    });
                } else {
                    alert("Related server information query failed!");
                    IsSearching = false;
                    $("#search").text("< < < FAIL > > >");
                }
            }
        });




        //searchVehicle
/*
        console.log("xxxFile_locationxxx ==", radioFileLocation)
        console.log("xxxradioFileTypexxx ==", radioFileType)
        console.log("xxxradioVideoTypexxx ==", radioVideoType)

        console.log("Param ::>", param[4].value);
*/


        let outputX = '<h2>DATA</h2>';
        outputX += ` 
                <ul>
                    <li><b>File Location:</b> ${radioFileLocation}</li>
                    <li><b>File Type:</b> ${radioFileType}</li>
                    <li><b>Video Type:</b> ${radioVideoType}</li>
                    <li><b>Start Time:</b> ${start_time}</li>
                   
                    
                    <li><b>End Time:</b> ${end_time}</li>
                    <li><b>Test:</b> ${beginstr2}</li>

                    <li><b>Test Plate:</b> ${searchVehicle}</li>

                   
                     <li><b>split :</b> ${strx}</li>
                     <li><b>split :</b> ${param}</li>
                </ul>
                    `;





        document.getElementById('output3').innerHTML = outputX;

        /*var radioFileLocation=('input:radio[name="FileLocation"]:checked').val();
        console.log("File_locationxxx ==",radioFileLocation)*/

    } ///////////////////////////////here 

    
    function shortHour2Second(hour) {
        var temp = hour.split(":");
        console.log("TEMP")
        console.log(temp)
        if (temp.length == 2) {
            return parseInt(temp[0]) * 3600 + parseInt(temp[1]) * 60;
        } else if (temp.length == 3) {
            return parseInt(temp[0]) * 3600 + parseInt(temp[1]) * 60 + parseInt(temp[2]);
        } else {
            return 0;
        }
    }



    function addVideoFileInfo(json) {
        console.log(json)
        //alert("1074")
        console.log("xTest JSONx")
        console.log(json)
        var files = new Array();
        console.log(typeof(files))
    
        if (json.files != null && json.files.length > 0) {
            //File list sort, according to the start time from small to large
            json.files.sort(function(a, b) {
                return a.beg > b.beg ? 1 : -1
            });
            console.log("PASS THE BEGxx")
            //Add to video file list
            alert("1194")
            var index = 0;
            for (var i = 0; i < json.files.length; i++) {
                //The vehicle does not contain this channel, then the information i s removed.
                var isAdd = true;
                //Can download the task of the whole file download
                //Multiple channel files, can only be downloaded
                //ChnMask>0 according to the position to determine the number of channels CHN is also a number of channels
                if (json.files[i].chnMask > 0) {
                    console.log("1203 :: IF")
                    var maskChnArray = getMaskChnArray(json.files[i].chnMask);
                    json.files[i].maskChns = maskChnArray.maskChns;
                    json.files[i].chnName = maskChnArray.maskChnNames;
                    json.files[i].isSegment = true; //Whether can only be downloaded
                    if (json.files[i].maskChns == '') {
                        isAdd = false;
                    }
                } else {
                    console.log("1212 :: ELSE7")
                    //chn == 98 All channels
                    if (json.files[i].chn == 98) {
                        json.files[i].chnName = getAllChnName();
                        json.files[i].isSegment = true;
                        if (json.files[i].chnName == '') {
                            isAdd = false;
                        }
                    } else {
                        json.files[i].chnName = getChnName(json.files[i].chn);
                        if (json.files[i].chnName == '') {
                            isAdd = false;
                        }
                    }
                }
                if (isAdd) {
                    json.files[i].id = index;
                    if (json.files[i].type == 1) {
                        json.files[i].color = "#FF0000";
                    }
                    json.files[i].vehiIdno = $("#selnumber  option:selected").text();
                    //Handling files across days
                    processFileDay(json.files[i]);
                    json.files[i].isDirect = true;
                    files.push(json.files[i]);
                    index++;
                }
            }
            if (files.length > 0) {
                //Add to video file list
                $("#videoFileTable").flexAppendRowJson(files, false);
                $.dialog.tips(parent.lang.searchCompleted, 1);
                $(".flexigrid div.bDiv").css('max-height', '264px');
            }
        }
        console.log("HERE ITs FAILURE");
        if (json.result == 0) {
            if (files.length <= 0) {
                $.dialog.tips(lang.NullVideoFileInfo, 2);
            }
        } else {
            var mess = '';
            if ((typeof showDialogErrorMessage) == 'function') {
                mess = showDialogErrorMessage(json.result, json.cmsserver);
            }
            if (mess != null && mess == '') {
                alert("Failed to obtain video file information!xxxxxxx", 2);
            }
        }

    }
    undefined

    function getMaskChnArray(chnMask) {
        var chns = [];
        var chnNames = [];
        var vehicle = mapVehicleInfo.get(searchVehicle.toString());
        if (vehicle != null && vehicle.device != null && vehicle.device.channels && vehicle.device.channels.length > 0) {
            var channels = vehicle.device.channels;
            for (var i = 0; i < channels.length; i++) {
                if ((chnMask >> channels[i].index) & 1 > 0) {
                    chns.push(channels[i].index);
                    chnNames.push(channels[i].name);
                }
            }
        }
        var data = {};
        data.maskChns = chns.toString();
        data.maskChnNames = chnNames.toString();
        return data;
    }

 



    function initPlayerExample() {
        console.log("Inint video player is work")
        //Video parameter
        var params = {
            allowFullscreen: "true",
            allowScriptAccess: "always",
            bgcolor: "#FFFFFF",
            wmode: "transparent"
        };
        //Initialization is not completed
        isInitFinished = false;
        //Video card width
        var width = "400";
        //Video card hight
        var hieght = "400";
        //Initialize flash
        swfobject.embedSWF("player.swf", "cmsv6flash", width, hieght, "11.0.0", null, null, params, null);
        initFlash();
    }

    function initFlash() {
        if (swfobject.getObjectById("cmsv6flash") == null ||
            typeof swfobject.getObjectById("cmsv6flash").setWindowNum == "undefined") {
            
            setTimeout(initFlash, 50);
        } else {
            //Initialize plugin language
            //alert("Else")
            var language = $.trim($('.languagePath').val());
            //alert(language)
            if (!language) {
                $('.languagePath').focus();
                return;
            }
            swfobject.getObjectById("cmsv6flash").setLanguage(language);
            //Create all windows
            swfobject.getObjectById("cmsv6flash").setWindowNum(36);
            //Configuring the current window number
            var windowNum = 1;
            swfobject.getObjectById("cmsv6flash").setWindowNum(windowNum);
            swfobject.getObjectById("cmsv6flash").setServerInfo(serverIp, serverPort);
            isInitFinished = true;
        }
    }

    function videoFileReplay(obj, id) {
			QueryServer(id,'replay');
	}

  	//Access to video file playback server information
  	function doReplayVehicleServer(id,Idno,loc,svr,dwServer){
  		var beg=Number($("#row"+id+" .beg div").text());
       	var eng=Number($("#row"+id+" .end div").text());
       	var DValue=0;
       	var chnStr=$("#row"+id+" .vehiChn div").text();
       	var chn=chnStr.substring(2,chnStr.length)-1;
       	var filename =$("#row"+id+" .file div").text();
    	var lastindex=filename.lastIndexOf('/');
    	var title=filename.substring(lastindex+1,filename.length);
       	//Real time database access
     	var url='//'+dwServer.clientIp +':'+ dwServer.clientPort+'/3/5?DownType=5&DevIDNO='+Idno+'&FILELOC='+loc+'&FILESVR='+svr+'&FILECHN='+chn+'&FILEBEG='+beg+'&FILEEND='+eng+'&PLAYIFRM=0&PLAYFILE='+filename+'&PLAYBEG=0&PLAYEND='+DValue+'&PLAYCHN=0';
     	startPlayback(url,title);
  	}

    /**
   	*Set window title
   	**/
  	function setWindowTitle(title) {
      	if (!isInitFinished){
          	return;
      	} else {
      		//窗口下标
      		var index = 0;
          	swfobject.getObjectById("cmsv6flash").setVideoInfo(index, title);
      	}
      }	
      function startPlayback(url,title) {
 		if (!isInitFinished){
          	return;
      	} else {
      		
			setWindowTitle(title);
      		//Window index
      		var index = 0;
      		//Stop before playback
      		swfobject.getObjectById('cmsv6flash').stopVideo(index);
      		//Start playback
          	swfobject.getObjectById("cmsv6flash").startVod(index, url);
      	}
 	}
     	
 	/**
 	 * Stop remote playback
 	 **/
 	function stopPlayback() {
 		if (!isInitFinished){
          	return;
      	} else {
      		//Window index
      		var index = 0;
          	swfobject.getObjectById("cmsv6flash").stopVideo(index);
      	}
 	}
 	
 	/**
  	 * Video plug-in language
  	 **/
  	function setVideoLanguage() {
  		if (!isInitFinished){
          	return;
      	} else {
      		//Language file
      		var language = $.trim($('.languagePath').val());
         	if(!language) {
         		$('.languagePath').focus();
         		return;
         	}
          	swfobject.getObjectById("cmsv6flash").setLanguage(language);
      	}
      }
      

      function getFileTime(year, mon, day) {
		var retTime = "";
		retTime += Number(year)+2000;
		retTime += "-";
		if(mon < 10) {
			retTime += "0"+mon;
		}else {
			retTime += mon;
		}
		retTime += "-";
		if(day < 10) {
			retTime += "0"+day;
		}else {
			retTime += day;
		}
		return retTime;
	}
		
	//Breakpoint download video file
	function downloadVideoFile(id) {
		if(id != null) {
			if(!confirm(lang.allowed)){
				return;
			}
			//Search and download the video file server information, after the successful download video file information
			QueryServer(id,'down');
		}
    }
    
    //Query related server information
	function QueryServer(id,type) {
		var Idno;
		var loc,loctext=$("#row"+id+" .loc div").text();
		if(loctext==lang.Device){
			loc="1";
		}else if(loctext==lang.StorageServer){
			loc="2";
		}else if(loctext==lang.DownloadServer){
			loc="4";
		}
		var svr=$("#row"+id+" .svr div").text();
		var param = [];
		if(loc == 1) {
			Idno =$("#row"+id+" .devIdno div").text();
			param.push({name: 'DevIDNO', value: Idno});
		}else {
			Idno =$("#row"+id+" .vehiIdno div").text();
			param.push({name: 'DevIDNO', value: Idno});
		}
		param.push({name: 'Location', value: loc});
		param.push({name: 'FileSvrID', value: svr});
		param.push({name: 'jsession', value: jsion});
		//Real time server information
		$.ajax({
			type:'POST',
			url:'//'+ ip_ +':' + port_+'/3/1/callback=getData?MediaType=2&DownType=3',
			data:param,
			cache:false,
			dataType: 'jsonp',
			success: getData = function (data) {
				if(data.result == 0){
					if(type=='down'){
						doDownloadVideoFileInfo( Idno, id, data.server);
					}
					else if(type=='replay'){
						doReplayVehicleServer(id,Idno,loc,svr,data.server);
					}
				}else{
					alert(lang.ServerQueryPrompt);
				}
			}
        });
        
        
	}























    var myVideo = document.getElementById("video1");

    function playPause() {
        if (myVideo.paused)
            myVideo.play();
        else
            myVideo.pause();
    }

    function makeBig() {
        myVideo.width = 560;
    }

    function makeSmall() {
        myVideo.width = 320;
    }

    function makeNormal() {
        myVideo.width = 420;
    }
</script>