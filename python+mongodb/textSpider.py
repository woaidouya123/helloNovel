import requests
from lxml import etree
import time
from mongoOper import MongoHelper
import os

db = MongoHelper();
headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:61.0) Gecko/20100101 Firefox/61.0'}
 
#定义请求函数
def get_html(url,headers):
    response = requests.get(url , headers)
    return response.content

#定义解析函数
def resolve_html(content):
    html = etree.HTML(content);
    return html

#保存章节内容
def saveChapter(name,url,content,index,acticle_name):
    db.insertChapter({"name":name,"content":content,"url":url,"index":index,"article_name":acticle_name})
    db.updateDir({"name":acticle_name,"last":url,"count":index})

#保存目录
def saveDir(name,url,last):
    db.insertDir({"name":name,"url":url,"last":last})

#获取目录id
def getDirId(name):
    return db.getDirInfo({"name":name})[0]["_id"]

#爬取新文章
def getNewArticle(domain, dirurl, name):
   content = get_html(domain+dirurl,headers)
   #保存文章目录
   saveDir(name,dirurl,"")
   _id = getDirId(name)
   resolve_text = resolve_html(content)
   pages = resolve_text.xpath('//*[@id="list"]/dl/dd/a/@href')
   imgurl = resolve_text.xpath('//*[@id="fmimg"]/img/@src')[0]
   saveLogoImg(_id,imgurl)
   count = 1;
   for page in pages:
    page_content = get_html(domain+page,headers)
    time.sleep(1)
    html = resolve_html(page_content)
    title = html.xpath('//*[@class="bookname"]/h1')[0].text
    article = html.xpath('//*[@id="content"]/text()')
    print(title.strip())
    fulll_article = ""
    for part in article:
      fulll_article = fulll_article+part
    saveChapter(title.strip(),page,fulll_article,count,name)
    count = count+1

#更新文章章节
def updateArticleOne(domain, dirurl, name):
   content = get_html(domain+dirurl,headers)
   pages = resolve_html(content).xpath('//*[@id="list"]/dl/dd/a/@href')
   count = db.getChapterCount(name)+1;
   for page in pages[count-1:]:
    page_content = get_html(domain+page,headers)
    time.sleep(1)
    html = resolve_html(page_content)
    title = html.xpath('//*[@class="bookname"]/h1')[0].text
    article = html.xpath('//*[@id="content"]/text()')
    print(title.strip())
    fulll_article = ""
    for part in article:
      fulll_article = fulll_article+part
    saveChapter(title.strip(),page,fulll_article,count,name)
    count = count+1

#更新全部文章
def updateArticleAll():
   article_list = db.getAllDir();
   for article in article_list:
     updateArticleOne(article["domain"],article["url"],article["name"])

#保存文章图片
def saveLogoImg(_id, imgurl):
   project_path = os.path.dirname(os.path.abspath(__file__))
   project_path = project_path[:project_path.rfind("/")]
   print(project_path+"/images/")
   with open(project_path+"/images/"+str(_id)+".png",'wb') as f:
        f.write(requests.get(imgurl).content)
   print(str(_id)+".png"+"保存成功");
# getNewArticle("http://www.xbiquge.la","/13/13959/","圣墟")
# getNewArticle("http://www.xbiquge.la","/7/7931/","终极斗罗")
# getNewArticle("http://www.xbiquge.la","/14/14930/","元尊")
# getNewArticle("http://www.xbiquge.la","/5/5395/","凡人修仙传")
# getNewArticle("http://www.xbiquge.la","/26/26874/","沧元图")
# print(os.path.dirname(os.path.abspath(__file__)))
