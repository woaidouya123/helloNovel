import schedule
import time
import datetime
import textSpider

def job1():
    print('update article:%s' %(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
    textSpider.updateArticleAll()
    print('finish update:%s' % (datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
    print('------------------------------------------------------------------------')


if __name__ == '__main__':
#     schedule.every().day.at('17:49').do(job4)
    schedule.every(1).minutes.do(job1)
    while True:
        schedule.run_pending()