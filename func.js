
// 글자 수 카운터 값 변경
$(document).on('keyup', '#output', function(e) {
    var output = $(this).val();
    $('#outputcounter').text(getBytes(output));
    if (document.getElementById('outputcounter').innerText > 2000) {
        counterchange(1);
    } else {
        counterchange(0);
    }
});

// 글자 수 카운터 색 변경
function counterchange(int) {
    var x = document.getElementById("outputcounter");
    if (int == 1) {
        x.style.color = "red";
    } else {
        x.style.color = "black";
    }
}

// 글자 수 세기 함수    
function getBytes(str) {
    var cnt = 0;
    for (var i = 0; i < str.length; i++) {
        cnt += (str.charCodeAt(i) > 128) ? 2 : 1;
    }
    return cnt;
}
// 전체 선택 함수
function check_all() {
    for (i = 0; i < news.options.length; i++) {
        news.options[i].checked = true;
    }

}
// 전체 취소 함수
function cancel_all() {
    for (i = 0; i < news.options.length; i++) {
        news.options[i].checked = false;
    }
    newscontrol.checkboxall_news.checked = false;
    newscontrol.checkboxnone_news.checked = false;
}

// textarea 높이 조절 함수
function resize(obj) {
    obj.style.height = "1px";
    obj.style.height = (12 + obj.scrollHeight) + "px";
}

// 클립보드 복사
var clipboard = new ClipboardJS('#copy2clip');
clipboard.on('success', function() {
    alert('복사 되었습니다.');
});

clipboard.on('error', function() {
    alert('복사에 실패했습니다.');
});

function getdate() {
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd
}

if (mm < 10) {
    mm = '0' + mm
}

today = yyyy + mm + dd;
return [today, yyyy, mm, dd];
}

// 뉴스 생성 함수
function Newscreator() {


    var url1 = "https://news.naver.com/main/ranking/popularDay.nhn?rankingType=popular_day&sectionId="
    var url2 = "&date="
    var chk1 = document.news.checkbox1_news.checked;
    var chk2 = document.news.checkbox2_news.checked;
    var chk3 = document.news.checkbox3_news.checked;
    var chk4 = document.news.checkbox4_news.checked;
    var chk5 = document.news.checkbox5_news.checked;
    var chk6 = document.news.checkbox6_news.checked;
    var chk7 = document.news.checkbox7_news.checked;
    var date=getdate();
    var creatednews = document.getElementById('output');
    var outputcounter = document.getElementById('outputcounter');
    creatednews.value = []

    if (chk1 | chk2 | chk3 | chk4 | chk5 | chk6 | chk7) {
        creatednews.value += ("####" + date[1] + "년" + date[2] + "월" + date[3] + "일자 인편데일리####\n")
        creatednews.value += ("###########실시간 뉴스###########\n")
    }

    if (chk1) {
        var url_politics = url1 + 100 + url2 + date[0];
        creatednews.value += ("정 치\n")
        creatednews.value += (url_politics + "\n");
    }
    if (chk2) {
        var url_economy = url1 + 101 + url2 + date[0];
        creatednews.value += ("경 제\n")
        creatednews.value += (url_economy + "\n");
    }
    if (chk3) {
        var url_society = url1 + 102 + url2 + date[0];
        creatednews.value += ("사 회\n")
        creatednews.value += (url_society + "\n");
    }
    if (chk4) {
        var url_entertain = url1 + 103 + url2 + date[0];
        creatednews.value += ("연 예\n")
        creatednews.value += (url_entertain + "\n");
    }
    if (chk5) {
        var url_world = url1 + 104 + url2 + date[0];
        creatednews.value += ("세 계\n")
        creatednews.value += (url_world + "\n");
    }
    if (chk6) {
        var url_it = url1 + 105 + url2 + date[0];
        creatednews.value += ("I T\n")
        creatednews.value += (url_it + "\n");
    }
    if (chk7) {
        var url_sport = "https://sports.news.naver.com/index.nhn";
        creatednews.value += ("스포츠\n")
        creatednews.value += (url_sport + "\n");
    }

    outputcounter.innerText = getBytes(output.value);
    if (outputcounter.innerText > 2000) {
        counterchange(1);
    } else {
        counterchange(0);
    }
    resize(creatednews);
}
