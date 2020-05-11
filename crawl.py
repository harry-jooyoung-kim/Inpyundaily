def hello_world(request):
        """Responds to any HTTP request.
        Args:
            request (flask.Request): HTTP request object.
        Returns:
            The response text or any set of values that can be turned into a
            Response object using
            `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
        """

    from urllib.urllib import urlopen
    from bs4 import BeautifulSoup
    
    request_json = request.get_json()

    cat=request.args[1]
    date=request.args[2]

    categorynum=int(cat)

    html = urlopen("https://news.naver.com/main/ranking/popularDay.nhn?rankingType=popular_day&sectionId="+str(99+categorynum)+"&date="+str(date))  

    category=["gov","eco","soc","lif","wor","sci"]

    bsObject = BeautifulSoup(html, "html.parser", from_encoding='utf-8') 
    news=[]
    for link in bsObject.find_all('a',{"class":"nclicks(rnk."+category[categorynum-1]+")"}):
        news.append(link.get('title'))
        
    text_refine_news=[]
    fact_check=['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩']
    eow=[' ', '"', '.', '…', '\'','·','“','”','‘','’','`' ]  
    eos=['.', '…','·']

    for text_refine in news:
        cnt=0;
        leng=0
        tmp_string='*'
        
        for word in range(len(text_refine)):
            if text_refine[word] == '[' or text_refine[word] == '(':
                cnt=1
            elif cnt == 1 and (text_refine[word] == ']' or text_refine[word] == ')'):
                cnt=0
                pass
            elif text_refine[word] in fact_check:
                break
            elif cnt == 0:
                if  text_refine[word] in eow:
                    tmp_string=tmp_string+' '
                    leng+=1                  
                else:
                    tmp_string=tmp_string+text_refine[word]
                    leng+=1       
        text_refine_news.append(tmp_string) 

    content_refine_news=[]
    keyword=[]

    for content_refine in text_refine_news:
        cnt=0
        tmp_keyword='*'
        for word in range(len(content_refine)):        
            if content_refine[word] not in eow and word > 0:    
                tmp_keyword=tmp_keyword+content_refine[word]
            elif content_refine[word] in eow or word == len(content_refine)-1:
                if tmp_keyword not in keyword and len(tmp_keyword)>1:
                    keyword.append(tmp_keyword)
                elif tmp_keyword in keyword and len(tmp_keyword)>1:
                    cnt+=1
                tmp_keyword='*'
        if cnt < 2 and len(content_refine) > 20:
            if content_refine[1] == ' ':
                content_refine_news.append(content_refine[2:len(content_refine)])
            else:
                content_refine_news.append(content_refine[1:len(content_refine)])
                    

    return content_refine_news