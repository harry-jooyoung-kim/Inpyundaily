// 주식종목 추가 함수
var idx = 1;
$(document).ready(function() { 
    $("#button-addon2").on("click", function() {
     //stockinlist($('.searchstock').val())
     if (idx<6){
      $("#stock_chk").append("&nbsp;&nbsp;<input type='checkbox' class='form-check-input' name='options' id='checkboxstock"+idx+"' value='option"+idx+"'/>");
      $("#stock_chk").append("<label class='form-check-label' for='checkboxstock"+idx+"' id='stockname"+idx+"'>"+$('.searchstock').val()+"</label>");
      stock.options[idx-1].checked = true;
      stock.options[idx].checked = true;
      idx++;}
     else{
        alert('주식 정보는 6개 까지만 추가 가능합니다.');
      }

    });
});

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
        x.style.color = "whitesmoke";
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
// 뉴스 전체 선택 함수
function check_all_news() {
    for (i = 0; i < news.options.length; i++) {
        news.options[i].checked = true;
    }

}
// 뉴스 전체 취소 함수
function cancel_all_news() {
    for (i = 0; i < news.options.length; i++) {
        news.options[i].checked = false;
    }
    newscontrol.checkboxall_news.checked = false;
    newscontrol.checkboxnone_news.checked = false;
}
// 주식 전체 선택 함수
function check_all_stock() {
    for (i = 0; i < stock.options.length; i++) {
        stock.options[i].checked = true;
    }

}
// 주식 전체 취소 함수
function cancel_all_stock() {
    for (i = 0; i < stock.options.length; i++) {
        stock.options[i].checked = false;
    }
    stockcontrol.checkboxall_stock.checked = false;
    stockcontrol.checkboxnone_stock.checked = false;
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
    var hour = today.getHours();
    var minute = today.getMinutes();
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + mm + dd;
    return [today, yyyy, mm, dd,hour,minute];
}

// 뉴스 생성 함수
function Newscreator() {

    var date=getdate();
    var creatednews = document.getElementById('output');
    var outputcounter = document.getElementById('outputcounter');

    var isnews=0;
    for (i = 0; i < news.options.length; i++) {
        if (news.options[i].checked == true){
            isnews+=1;
        }
    }

    newslen=Math.floor(28/isnews);

    creatednews.value = []
    creatednews.value += ("#" + date[1] + "년" + date[2] + "월" + date[3] + "일자 인편데일리, "+date[4]+"시"+date[5]+"분에 작성 되었습니다.#\n")
    
    if (isnews) {
        creatednews.value += ("##실시간 뉴스##\n")
    }

    if (document.news.checkbox1_news.checked) {
        // crawl(1,date[0],newslen)
        creatednews.value += ("정 치\n")
    }
    if (document.news.checkbox2_news.checked) {
        // crawl(2,date[0],newslen)
        creatednews.value += ("경 제\n")
    }
    if (document.news.checkbox3_news.checked) {
        // crawl(3,date[0],newslen)
        creatednews.value += ("사 회\n")
    }
    if (document.news.checkbox4_news.checked) {
        // crawl(4,date[0],newslen)
        creatednews.value += ("문 화\n")
    }
    if (document.news.checkbox5_news.checked) {
        // crawl(5,date[0],newslen)
        creatednews.value += ("세 계\n")
    }
    if (document.news.checkbox6_news.checked) {
        // crawl(6,date[0],newslen)
        creatednews.value += ("과 학\n")
    }

    outputcounter.innerText = getBytes(output.value);
    if (outputcounter.innerText > 2000) {
        counterchange(1);
    } else {
        counterchange(0);
    }
    resize(creatednews);
}

// 주가 생성 함수
function Stockcreator() {

    var creatednews = document.getElementById('output');
    var outputcounter = document.getElementById('outputcounter');

    var isstock=0;
    for (i = 0; i < stock.options.length; i++) {
        if (stock.options[i].checked == true){
            isstock=1;
        }
    }

    if (isstock){
    creatednews.value += ("##주식 정보##\n")
    }

    for (i = 0; i < stock.options.length; i++) {
        if (stock.options[i].checked == true){
            var tmp=$("label[for='checkboxstock"+(i+1)+"']").text();
            creatednews.value += (tmp+"\n")
            creatednews.value += ("시가:"+"고가:"+"저가:"+"종가:"+"거래량:"+"전일비:"+"\n")
        }
    }

    outputcounter.innerText = getBytes(output.value);
    if (outputcounter.innerText > 2000) {
        counterchange(1);
    } else {
        counterchange(0);
    }
    resize(creatednews);
}
