import pymongo

class MongoHelper(object):
	"""docstring for MongoHelper"""
	def __init__(self):
		super(MongoHelper, self).__init__()
		self.myclient = pymongo.MongoClient("mongodb://localhost:27017/")
		self.mydb = self.myclient["hellonovel"]
		self.novel_dir = self.mydb["dirs"]
		self.novel_content = self.mydb["chapters"]

	#获取全部目录
	def getAllDir(self):
		result = []
		for item in self.novel_dir.find():
			result.append(item)
		return result

	#获取目录详情
	def getDirInfo(self,dir):
		result = []
		for item in self.novel_dir.find(dir):
			result.append(item)
		return result

	#插入文章目录
	def insertDir(self, dir):
		return self.novel_dir.insert(dir)

	#更新文章目录
	def updateDir(self, dir):
		return self.novel_dir.update({"name":dir["name"]},{"$set":{"last":dir["last"],"count":dir["count"]}})

	#查询全部章节
	def getAllChapter(self, novelname):
		result = []
		for item in self.novel_content.find({"name":novelname}):
			result.append(item)
		return result

	#插入文章章节
	def insertChapter(self, chapter):
		return self.novel_content.insert(chapter)

	#获取总章节数
	def getChapterCount(self, novelname):
		return self.novel_dir.find_one({"name":novelname})["count"]

