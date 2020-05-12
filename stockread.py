def stockread(request):
    import pandas as pd
    from pandas import DataFrame
    
    request_json = request.get_json()
    
    code_id=request_json[0]

    code_df = pd.read_html("http://kind.krx.co.kr/corpgeneral/corpList.do?method=download&searchType=13", header=0)[0]
    code_df.종목코드 = code_df.종목코드.map('{:06d}'.format)

    name_list = DataFrame(code_df['회사명']).values.tolist()
    code_list = DataFrame(code_df['종목코드']).values.tolist()
    
    name=[]
    code=[]
    output=[]
    
    for i in range(len(name_list)):
        name.append(name_list[i][0])
        code.append(code_list[i][0])

    if code_id.isdigit():
        code=code_id
    else:
        cnt=0
        for rn in name:
            if code_id == rn:
                code=code[cnt]
            else:
                cnt+=1   
    try:
        pg_url = 'http://finance.naver.com/item/sise_day.nhn?code={code}'.format(code=code)
        df = pd.DataFrame()
        df = df.append(pd.read_html(pg_url, header = 0)[0], ignore_index=True, sort = True)
        df = df.dropna()
        output=[df['시가'][1],df['고가'][1],df['저가'][1],df['종가'][1],df['거래량'][1],df['종가'][1]-df['종가'][2]]
    except:
        pass
    
    results=str()
    for i in output:
        results+=str(i)+"\n"

    return results