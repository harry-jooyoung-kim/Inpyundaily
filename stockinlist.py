def stockinlist(request):
    import pandas as pd
    from pandas import DataFrame

    request_json = request.get_json()
    
    stockname=str(request_json[0])
    code_df = pd.read_html("http://kind.krx.co.kr/corpgeneral/corpList.do?method=download&searchType=13", header=0)[0]
    code_df.종목코드 = code_df.종목코드.map('{:06d}'.format)

    name_list = DataFrame(code_df['회사명']).values.tolist()
    code_list = DataFrame(code_df['종목코드']).values.tolist()

    name=[]
    code=[]

    for i in range(len(name_list)):
        name.append(name_list[i][0])
        code.append(code_list[i][0])
    chk=0
    if stockname in name:
        chk=1
    if stockname in code:
        chk=1

    chk=str(chk)
    return chk