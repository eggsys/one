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
    <title>Page Title</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='https://bootswatch.com/4/lux/bootstrap.min.css'>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <!--<script type="text/javascript" src="http://127.0.0.1:8887/WdatePicker.js"></script> -->
    <!--<script src='main.js'></script> -->
</head>

<body>
    <!-- <button id="getjs2" class="btn btn-danger"> Show only JsessionX </button>
    <div id="jsx" class="jumbotron"></div> -->
    <button id="getjsessionapi" class="btn btn-danger"> get Jsession from API</button>
    <div id="output" class="jumbotron">Your Jsession will be here</div>
    <div id="output2" class="jumbotron">Your Car List will be here</div>
    <!--
    <div id="outputxx" class="jumbotron"></div> 
-->


    <div>
        <table>
            <tr>
                <td> <label> CAR: </label> </td>
                <td>
                    <select id="test" onchange="ChangeList()">
                        <option> ---Car--- </option>
                    </select>
                </td>

                <td><label for="meeting-time">Video Start:</label></td>
                <td><input type="datetime-local" id="meeting-time" name="meeting-time" value="2018-06-12T19:30" min="2018-06-07T00:00" max="2018-06-14T00:00" onclick="time_start()"></td>
                <td> <label for="ending-time"> TO :</label></td>
                <td> <input type="datetime-local" id="ending-time" name="meeting-time" value="2018-06-12T20:30" min="2018-06-07T00:00" max="2018-06-14T00:00" onclick="time_end()"></td>
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

    <div>
        <span id="labelStartTime" style="padding-left: 20px;">Start：</span>
        <input id="startTime" class="Wdate" type="text" style="width: 140px;" readonly="" size="15">
        <span id="labelEndTime" style="padding-left: 20px;">End：</span>
        <input id="endTime" class="Wdate" type="text" style="width: 140px;" readonly="" size="15">
    </div>



    <button id="search" class="button button-primary button-rounded button-small settings" onclick="Search()">Search</button>


    <div id="output3" class="jumbotron">Your data List will be here</div>

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
    //var dynamic = [];
    var dynamic = []
    var myArray = ["x", "y", "z"];
    var login_url = 'http://tod-office2.ddns.net:8080/StandardApiAction_login.action?account=admin&password=admin'

    var VideoVal = 1;
    var FileType_val = 1;
    var file_location = 1;
    var File_type = 2;
    var Video_type = 1;


    var jsion = ""; //Used to determine whether the landing
    var ip_ = "";
    var port_ = "";
    var isLanding = false; //To determine whether the landing
    var IsSearching = false; //To determine whether the search
    var loadTimeLine = true; //Whether to load the timeline, if the return file date error is not loaded
    //var mapVehicleInfo = new Hashtable();//vehicle info
    var isInitFinished = false; //Video plug-in is loaded to complete
    var serverIp = ""; //Server IP
    var serverPort = ""; //Server Port
    var lang;
    var searchVehicle = null; //The vehicle being query



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
        /*
                //Custom header
                if ($.query.get("lang") == "zh") {
                    lang = new langZhCn();
                    $('.languagePath').val('cn.xml');
                } else {
                    lang = new langEn();
                    $('.languagePath').val('en.xml');
                }
        */
        /*
                $("#videoFileTable").flexigrid({
                    url: "", //"StandardTrackAction_query.action"
                    dataType: 'json',
                    colModel: [{
                            display: lang.operator,
                            name: 'operator',
                            width: 100,
                            sortable: false,
                            align: 'center'
                        },
                        {
                            display: lang.fileIndex,
                            name: 'fileIndex',
                            width: 40,
                            sortable: false,
                            align: 'center'
                        },
                        {
                            display: lang.fileTime,
                            name: 'fileTime',
                            width: 150,
                            sortable: false,
                            align: 'center'
                        },
                        {
                            display: lang.Type,
                            name: 'type',
                            width: 80,
                            sortable: false,
                            align: 'center'
                        },
                        {
                            display: lang.spanDevice,
                            name: 'vehiIdno',
                            width: 100,
                            sortable: false,
                            align: 'center'
                        },
                        {
                            display: lang.vehiChn,
                            name: 'vehiChn',
                            width: 70,
                            sortable: false,
                            align: 'center'
                        },
                        {
                            display: lang.loc,
                            name: 'loc',
                            width: 80,
                            sortable: false,
                            align: 'center'
                        },
                        {
                            display: lang.fileSize,
                            name: 'fileSize',
                            width: 80,
                            sortable: false,
                            align: 'center'
                        },
                        {
                            display: lang.file,
                            name: 'file',
                            width: 380,
                            sortable: false,
                            align: 'center'
                        },
                        {
                            display: 'svr',
                            name: 'svr',
                            hide: true
                        },
                        {
                            display: 'devIdno',
                            name: 'devIdno',
                            hide: true
                        },
                        {
                            display: 'len',
                            name: 'len',
                            hide: true
                        },
                        {
                            display: 'chnMask',
                            name: 'chnMask',
                            hide: true
                        },
                        {
                            display: 'beg',
                            name: 'beg',
                            hide: true
                        },
                        {
                            display: 'end',
                            name: 'end',
                            hide: true
                        },
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
        */

        //loadLang();

        /*
                $("#videoFileTable").flexSetFillCellFun(function(p, row, idx, index) {
                    return fillVideoFileTable(p, row, idx, index);
                });
        */
        //Initialize video plug ins
        // initPlayerExample();

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



    function userLogin() {
		if(isLanding==true){
			return;
		}
		var account = $.trim($('.account').val());
		if(account == '') {
			$('.account').focus();
			return;
		}
		var password = $.trim($('.password').val());
		if(password == '') {
			$('.password').focus();
			return;
		}
		ip_ = $('.ip').val();
		if(ip_ == '') {
			$('.ip').focus();
			return;
		}
		port_ = $('.port').val();
		if(port_ == '') {
			$('.port').focus();
			return;
		}
		isLanding=true;
		$("#userLoginBtn").text(lang.Landing);
		var param = [];
		param.push({name: 'account', value: account});
		param.push({name: 'password', value: password});
		
		$.ajax({
		type: 'POST',
		url: '//'+ window.location.host +'/StandardApiAction_login.action',
		data: param,
		cache:false,/*Disable browser cache*/
		dataType: 'jsonp',
		success: function (data) {
			if(data.result == 0){
					jsion=data.jsession;
					var param = [];
					param.push({name: 'jsession', value:jsion });
					$.ajax({
						type: 'POST',
						url: '//'+ window.location.host +'/StandardApiAction_queryUserVehicle.action',
						data: param,
						cache:false,/*Disable browser cache*/
						dataType: 'jsonp',
						success: function (data) {
							$("#selnumber option").remove();
							if(data.result == 0){
								if(data.vehicles && data.vehicles.length > 0) {
									loadMapVehicleInfo(data.vehicles);
									
									mapVehicleInfo.each(function(key, value) {
										$("#selnumber").append("<option value="+value.device.idno+">"+key+"</option>");
									});
								}
							}
							isLanding=false;
							$("#userLoginBtn").text(lang.login);
						},error: function() {
							alert(lang.GetnumberPrompt);
							isLanding=false;
							$("#userLoginBtn").text(lang.login);
						}
					});
				}
			},error: function() {
				alert(lang.LoginPrompt);
				isLanding=false;
				$("#userLoginBtn").text(lang.login);
			}
		});
	}





    function getJsession2() {
        fetch(login_url)
            .then((res) => res.json())
            .then((data) => {

                var jsx = data.jsession
                var acc = data.account_name
                jsession_ID = data.jsession //used
                Account = data.account_name //used


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
                return urlx = url
            })
            .then((VeID) => {

                getVehicle_ID()
                console.log("=========================")
                console.log(vehicles_id)

                //console.log(dynamic)


            })
            .then(
                testxy()


            )


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
                console.log("dyn=" + dynamic[0])

                let output2 = '<h2>Cars List</h2>';
                output2 += ` 
                <ul>
                    <li><b>ID:</b> ${vehicles_id}</li>
                    
                </ul>
                    `;

                document.getElementById('output2').innerHTML = output2;

                $vehicles_id_x = vehicles_id

                console.log("LOG")
                //let myArray = ["x", "y", "z"];
                let output
                // myArray.push("BOX")
                for (let i = 0; i < myArray.length; i++) {
                    output += "<option value =" + myArray[i] + ">" + myArray[i] + "</option>";
                    //console.log(i)
                    //console.log(myArray[i])
                }
                document.getElementById("test").innerHTML = output;
                return vehicles_id
                return dynamic



            })
    }


    function loadMapVehicleInfo(vehicles) {
        for (var i = 0; i < myArray.length; i++) {
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

































    function testxy() {
        console.log("xyx")
        console.log(dynamic[0])
    }

    function getOption() {
        let output
        for (let i = 0; i < dynamic.length; i++) {
            output += "<option value =" + dynamic[i] + ">" + dynamic[i] + "</option>";
            console.log(i)
            console.log(dynamic[i])
        }
        document.getElementById("test").innerHTML = output;
    }

    function endtest() {

        var delayInMilliseconds = 5000; //1 second

        setTimeout(function() {
            console.log("dynamic" + dynamic[1])
        }, delayInMilliseconds);

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

        //let outputX = VideoVal
        //console.log(outputX)
        var yy = document.getElementsByName('FileLocation').values
        FileType_val = document.getElementsByName('FileType').value;
        start_time = document.getElementById('meeting-time').value;
        end_time = document.getElementById('ending-time').value;

        var beginstr2 = $("#meeting-time").val();
        beginstr2 = beginstr2.replace(/-/g, "/");

        var beginstr = $("FileLocation").val();
        var start_date = new Date(start_time);
        var end_date = new Date(end_time);

        var Full_year = start_date.getFullYear();
        var Full_month = start_date.getMonth();
        var Full_date = start_date.getDate();

        var Full_year2 = end_date.getFullYear();
        var Full_month2 = end_date.getMonth();
        var Full_date2 = end_date.getDate();

        var format_startdate = Full_year + "-" + Full_month + "-" + Full_date + " " + 0 + ":" + 0 + ":" + 0
        var format_enddate = Full_year2 + "-" + Full_month2 + "-" + Full_date2 + " " + 0 + ":" + 0 + ":" + 0





        console.log("beginstr:", beginstr)
        console.log("ft:", File_type)


        var radioFileLocation = $('input:radio[name="FileLocation"]:checked').val();
        var radioFileType = $('input:radio[name="FileType"]:checked').val();
        var radioVideoType = $('input:radio[name="VideoType"]:checked').val();
        console.log("xxxFile_locationxxx ==", radioFileLocation)
        console.log("xxxradioFileTypexxx ==", radioFileType)
        console.log("xxxradioVideoTypexxx ==", radioVideoType)



        let outputX = '<h2>Output DATA</h2>';
        outputX += ` 
                <ul>
                    <li><b>File Location:</b> ${radioFileLocation}</li>
                    <li><b>File Type:</b> ${radioFileType}</li>
                    <li><b>Video Type:</b> ${radioVideoType}</li>
                    <li><b>Start Time:</b> ${start_time}</li>
                    <li><b>Test format_startdate:</b> ${format_startdate}</li>
                    <li><b>Test format_enddate:</b> ${format_enddate}</li>
                    
                    <li><b>End Time:</b> ${end_time}</li>
                    <li><b>Test:</b> ${beginstr2}</li>
                   
                    
                </ul>
                    `;





        document.getElementById('output3').innerHTML = outputX;

        /*var radioFileLocation=('input:radio[name="FileLocation"]:checked').val();
        console.log("File_locationxxx ==",radioFileLocation)*/
    }

    function Search2() {
        /*
		if(jsion==""){
			alert(lang.NotloggedPrompt);
			return;
        }
        */
        if (IsSearching == true) {
            return;
        }
        IsSearching = true;
        $("#search").text(lang.searching);
        var number = $("#selnumber  option:selected").text();
        searchVehicle = number;
        var id = $("#selnumber  option:selected").val();
        var json = $("#namejsession").text();
        var radioFileLocation = $('input:radio[name="FileLocation"]:checked').val();
        var radioFileType = $('input:radio[name="FileType"]:checked').val();
        var radioVideoType = $('input:radio[name="VideoType"]:checked').val();
        var beginstr = $("#startTime").val();
        var str = beginstr.split(" ");
        var begstr = beginstr.replace(/-/g, "/");
        var begdate = new Date(begstr);
        var date = str[0].split("-");
        var y = date[0].toString(); // year
        var m = date[1].toString(); // month
        var d = date[2].toString(); // dat
        var endstr = $("#endTime").val();
        endstr = endstr.split(" ");
        var beg = shortHour2Second(str[1].toString());
        var end = shortHour2Second(endstr[1].toString());
        var param = [];
        param.push({
            name: 'MediaType',
            value: 2
        });
        param.push({
            name: 'DownType',
            value: 2
        });
        param.push({
            name: 'jsession',
            value: jsion
        });
        if (radioFileLocation != 1) {
            param.push({
                name: 'DevIDNO',
                value: number.toString()
            });
        } else {
            param.push({
                name: 'DevIDNO',
                value: id.toString()
            });
        }
        param.push({
            name: 'Location',
            value: Number(radioFileLocation)
        });
        $.ajax({
            type: 'POST',
            url: '//' + ip_ + ':' + port_ + '/3/1/callback=getData',
            data: param,
            cache: false,
            dataType: 'jsonp',
            success: getData = function(data) {
                if (data.result == 0) {
                    serverIp = data.server.clientIp;
                    serverPort = data.server.clientPort;
                    var param2 = [];
                    param2.push({
                        name: 'DownType',
                        value: 2
                    });
                    param2.push({
                        name: 'jsession',
                        value: Number(json)
                    });
                    if (radioFileLocation != 1) {
                        param2.push({
                            name: 'DevIDNO',
                            value: number.toString()
                        });
                    } else {
                        param2.push({
                            name: 'DevIDNO',
                            value: id.toString()
                        });
                    }
                    param2.push({
                        name: 'LOC',
                        value: Number(radioFileLocation)
                    });
                    param2.push({
                        name: 'CHN',
                        value: -1
                    });
                    param2.push({
                        name: 'YEAR',
                        value: Number(y)
                    });
                    param2.push({
                        name: 'MON',
                        value: Number(m)
                    });
                    param2.push({
                        name: 'DAY',
                        value: Number(d)
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
                        url: '//' + serverIp + ':' + serverPort + '/3/5/callback=getData',
                        data: param2,
                        cache: false,
                        dataType: 'jsonp',
                        success: getData = function(json) {
                            $("#videoFileTable tr").remove();
                            if (data.result == 0) {
                                addVideoFileInfo(json);
                            } else {
                                alert(lang.VideoQueryPrompt);
                            }
                            IsSearching = false;
                            $("#search").text(lang.search);
                        }
                    });
                } else {
                    //alert(lang.ServerQueryPrompt);
                    IsSearching = false;
                    $("#search").text(lang.search);
                }
            }
        });
    }

    function shortHour2Second(hour) {
        var temp = hour.split(":");
        if (temp.length == 2) {
            return parseIntDecimal(temp[0]) * 3600 + parseIntDecimal(temp[1]) * 60;
        } else if (temp.length == 3) {
            return parseIntDecimal(temp[0]) * 3600 + parseIntDecimal(temp[1]) * 60 + parseIntDecimal(temp[2]);
        } else {
            return 0;
        }
    }
    undefined
</script>