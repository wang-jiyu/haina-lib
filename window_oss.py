#coding:utf-8
from aliyunsdkcore.client import AcsClient
from aliyunsdkcore.request import RpcRequest
import commands
import oss2
import os

class OSS_resouce(object):
    def __init__(self):
        self.auth = oss2.Auth('LTAIPbl6650CGCWd','5bozPnpcPvquE5CtUTSz09KTGMLAv7')

    def bin_upload_files(self):
        self.bucket = oss2.Bucket(self.auth, 'http://oss-cn-beijing.aliyuncs.com', 'hn-web')
        for root, dirs, files in os.walk('dist/v1.0.3', topdown=False):
            for name in files:
                print os.path.join(root,name).replace("\\","/")
                self.bucket.put_object_from_file('web/js/{yun_name}'.format(yun_name=os.path.join(root, name).replace("\\","/")),'{local_name}'.format(local_name=os.path.join(root,name).replace("\\","/")))


        print 'update '+str(len(name))+' files'
if __name__ == '__main__':
    OSS_resouce().bin_upload_files()
