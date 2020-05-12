def crawl(request):
    from urllib.request import urlopen
    from bs4 import BeautifulSoup
    
    request_json = request.get_json()

    cat=request_json[0]
    date=request_json[1]
    ran=request_json[2]

    categorynum=int(cat)
    rank=int(ran)
    html = urlopen("https://news.naver.com/main/ranking/popularDay.nhn?rankingType=popular_day&sectionId="+str(99+categorynum)+"&date="+str(date))  

    category=["gov","eco","soc","lif","wor","sci"]

    bsObject = BeautifulSoup(html, "html.parser", from_encoding='utf-8') 
    news=[]
    for link in bsObject.find_all('a',{"class":"nclicks(rnk."+category[categorynum-1]+")"}):
        news.append(link.get('title'))
        
    text_refine_news=[]
    fact_check=['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩']
    eow=[' ', '"', '.', '…', '\'','·','“','”','‘','’','`' ]  
    eos=['"', '.', '\'','·','“','”','‘','’','`']

    for text_refine in news:
        cnt=0
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
                if text_refine[word] == '.' and text_refine[word+1] == '.' and text_refine[word+2] == '.':
                    tmp_string=tmp_string+'…'
                elif text_refine[word] == '·' and text_refine[word+1] == '·' and text_refine[word+2] == '·':
                    tmp_string=tmp_string+'…'
                elif  text_refine[word] in eos:
                    pass     
                else:
                    tmp_string=tmp_string+text_refine[word]
        text_refine_news.append(tmp_string) 

    content_refine_news=[]
    keyword=[]
    itemcnt=0
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
        if cnt < 2 and len(content_refine) > 20 and itemcnt < rank:
            if content_refine[1] == ' ':
                content_refine_news.append(content_refine[2:len(content_refine)])
                itemcnt+=1
            else:
                content_refine_news.append(content_refine[1:len(content_refine)])
                itemcnt+=1
                    
    news=str()
    for i in content_refine_news:
        news+=i+"\n"

    return news