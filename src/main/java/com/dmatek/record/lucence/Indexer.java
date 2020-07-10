package com.dmatek.record.lucence;

import com.alibaba.fastjson.JSONObject;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.cn.smart.SmartChineseAnalyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.*;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.*;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.jsoup.Jsoup;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/20 16:04
 * @Version 1.0
 */
public class Indexer {

    private final static Logger logger= LoggerFactory.getLogger(Indexer.class);
    /**
     * 写索引实例
     */
    private IndexWriter indexWriter;
    private Directory directory;
    private Analyzer analyzer;
    private IndexWriterConfig indexWriterConfig;


    /**
     * 构造方法,实例化 IndexWriter
     * @param indexDir indexDir
     * @throws IOException Exception
     */
    public Indexer(String indexDir) {
        try {
            logger.info("Indexer init"+indexDir);
            directory = FSDirectory.open(Paths.get(indexDir));
            //标准分词器,会自动去掉空格,is a the 等单词
            analyzer=new SmartChineseAnalyzer();
            //将标准分词器配到写索引的配置中
            indexWriterConfig=new IndexWriterConfig(analyzer);
            //实例化写索引对象
            indexWriter=new IndexWriter(directory,indexWriterConfig);
        } catch (IOException e) {
            logger.error(e.toString());
        }
    }

    public List<JSONObject> search(String q){
        //获取要查询的路径，也就是索引所在的位置
        try {
            IndexReader reader = DirectoryReader.open(directory);
            //构建 IndexSearcher
            IndexSearcher searcher = new IndexSearcher(reader);
            //标准分词器，会自动去掉空格啊，is a the 等单词
            Analyzer analyzer = new SmartChineseAnalyzer();
            //查询解析器
            QueryParser parser = new QueryParser("blgdescription", analyzer);
            //通过解析要查询的 String，获取查询对象，q 为传进来的待查的字符串
            Query query = parser.parse(q);


            //记录索引开始时间
            long startTime = System.currentTimeMillis();
            TopDocs docs = searcher.search(query, 20);
            //记录索引结束时间
            long endTime = System.currentTimeMillis();

            System.out.println("匹配" + q + "共耗时" + (endTime-startTime) + "毫秒");
            System.out.println("查询到" + docs.totalHits + "条记录");
            List<JSONObject> jsonObjectList=new ArrayList<>();
            //取出每条查询结果
            for(ScoreDoc scoreDoc : docs.scoreDocs) {
                //scoreDoc.doc相当于 docID，根据这个 docID 来获取文档
                Document doc = searcher.doc(scoreDoc.doc);
                System.out.println(docs.toString());
                System.out.println(scoreDoc.toString());
                System.out.println(doc.toString());
                //fullPath 是刚刚建立索引的时候我们定义的一个字段，表示路径。也可以取其他的内容，只要我们在建立索引时有定义即可。
                System.out.println(doc.get("filePath"));
                String classPath=getClass().getClassLoader().getResource("static/blog").getFile();
                System.out.println(classPath.substring(1,classPath.length()));
                JSONObject jsonObject=new JSONObject();
                jsonObject.put("filePath",doc.get("filePath").replace(classPath.substring(1,classPath.length()).replace("/","\\")+"\\",""));
//                jsonObject.put("fileName",doc.get("fileName"));
                jsonObject.put("blogname",doc.get("blogname"));
                jsonObject.put("helpusername",doc.get("helpusername"));
                jsonObject.put("blogstate",doc.get("blogstate"));
                jsonObject.put("blogdescription",doc.get("blgdescription"));
                jsonObjectList.add(jsonObject);
            }

            reader.close();
            return jsonObjectList;
        } catch (IOException e) {
            e.printStackTrace();
            logger.error(e.toString());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<JSONObject> search(String q,int pageNow,int pageSize){
        //获取要查询的路径，也就是索引所在的位置
        try {
            IndexReader reader = DirectoryReader.open(directory);
            //构建 IndexSearcher
            IndexSearcher searcher = new IndexSearcher(reader);
            //标准分词器，会自动去掉空格啊，is a the 等单词
            Analyzer analyzer = new SmartChineseAnalyzer();
            //查询解析器
            QueryParser parser = new QueryParser("blgdescription", analyzer);
            //通过解析要查询的 String，获取查询对象，q 为传进来的待查的字符串
            Query query = parser.parse(q);


            //记录索引开始时间
            long startTime = System.currentTimeMillis();
            int start = (pageNow - 1) * pageSize;
            if(pageNow==1){
                start=pageNow*pageSize;
            }
            TopDocs docs = searcher.search(query, start);
            if(pageNow!=1){
                ScoreDoc preScore = docs.scoreDocs[start-1];
                //查询最后一条后的数据的一页数据
                docs = searcher.searchAfter(preScore, query, pageSize);

            }
            //记录索引结束时间
            long endTime = System.currentTimeMillis();

            System.out.println("匹配" + q + "共耗时" + (endTime-startTime) + "毫秒");
            System.out.println("查询到" + docs.totalHits + "条记录");
            List<JSONObject> jsonObjectList=new ArrayList<>();
            //取出每条查询结果
            for(ScoreDoc scoreDoc : docs.scoreDocs) {
                //scoreDoc.doc相当于 docID，根据这个 docID 来获取文档
                Document doc = searcher.doc(scoreDoc.doc);
                System.out.println(docs.toString());
                System.out.println(scoreDoc.toString());
                System.out.println(doc.toString());
                //fullPath 是刚刚建立索引的时候我们定义的一个字段，表示路径。也可以取其他的内容，只要我们在建立索引时有定义即可。
                System.out.println(doc.get("filePath"));
                String classPath=getClass().getClassLoader().getResource("static/blog").getFile();
                System.out.println(classPath.substring(1,classPath.length()));
                JSONObject jsonObject=new JSONObject();
                jsonObject.put("filePath",doc.get("filePath").replace(classPath.substring(1,classPath.length()).replace("/","\\")+"\\",""));
//                jsonObject.put("fileName",doc.get("fileName"));
                jsonObject.put("blogname",doc.get("blogname"));
                jsonObject.put("helpusername",doc.get("helpusername"));
                jsonObject.put("blogstate",doc.get("blogstate"));
                jsonObject.put("blogdescription",doc.get("blgdescription"));
                jsonObjectList.add(jsonObject);
            }

            reader.close();
            return jsonObjectList;
        } catch (IOException e) {
            e.printStackTrace();
            logger.error(e.toString());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }


    public List<JSONObject> searchName(String userName){
        //获取要查询的路径，也就是索引所在的位置
        try {
            IndexReader reader = DirectoryReader.open(directory);
            //构建 IndexSearcher
            IndexSearcher searcher = new IndexSearcher(reader);
            //标准分词器，会自动去掉空格啊，is a the 等单词
            Analyzer analyzer = new SmartChineseAnalyzer();
            //查询解析器
            QueryParser parser = new QueryParser("blogstate", analyzer);

            //通过解析要查询的 String，获取查询对象，q 为传进来的待查的字符串
            Query query = parser.parse("进行中");


            QueryParser parser1 = new QueryParser("createname", analyzer);
            Query query1 = parser1.parse(userName);
            QueryParser parser2 = new QueryParser("helpusername", analyzer);
            Query query2 = parser2.parse(userName);

            BooleanQuery.Builder booleanQueryBuilder = new BooleanQuery.Builder();
            booleanQueryBuilder.add(query,BooleanClause.Occur.MUST);

            BooleanQuery.Builder booleanQueryBuilder1 = new BooleanQuery.Builder();
            booleanQueryBuilder1.add(query1,BooleanClause.Occur.SHOULD);
            booleanQueryBuilder1.add(query2,BooleanClause.Occur.SHOULD);
            Query query3=booleanQueryBuilder1.build();

            booleanQueryBuilder.add(query3,BooleanClause.Occur.MUST);
            Query query4=booleanQueryBuilder.build();

            //记录索引开始时间
            long startTime = System.currentTimeMillis();
            TopDocs docs = searcher.search(query4, 1000);
            //记录索引结束时间
            long endTime = System.currentTimeMillis();

            System.out.println("匹配未完成共耗时" + (endTime-startTime) + "毫秒");
            System.out.println("查询到" + docs.totalHits + "条记录");
            List<JSONObject> jsonObjectList=new ArrayList<>();
            //取出每条查询结果
            for(ScoreDoc scoreDoc : docs.scoreDocs) {
                //scoreDoc.doc相当于 docID，根据这个 docID 来获取文档
                Document doc = searcher.doc(scoreDoc.doc);
                System.out.println(docs.toString());
                System.out.println(scoreDoc.toString());
                System.out.println(doc.toString());
                //fullPath 是刚刚建立索引的时候我们定义的一个字段，表示路径。也可以取其他的内容，只要我们在建立索引时有定义即可。
                System.out.println(doc.get("filePath"));
                String classPath=getClass().getClassLoader().getResource("static/blog").getFile();
                System.out.println(classPath.substring(1,classPath.length()));
                JSONObject jsonObject=new JSONObject();
                jsonObject.put("filePath",doc.get("filePath").replace(classPath.substring(1,classPath.length()).replace("/","\\")+"\\",""));
//                jsonObject.put("fileName",doc.get("fileName"));
                jsonObject.put("blogname",doc.get("blogname"));
                jsonObject.put("helpusername",doc.get("helpusername"));
                jsonObject.put("blogstate",doc.get("blogstate"));
                jsonObject.put("blogdescription",doc.get("blgdescription"));
                jsonObjectList.add(jsonObject);
            }

            reader.close();
            return jsonObjectList;
        } catch (IOException e) {
            e.printStackTrace();
            logger.error(e.toString());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }


    private Document getDocument(File file) throws IOException {
        Document document=new Document();
        Field fileNameField=new TextField("fileName",file.getName(), Field.Store.YES);
        document.add(fileNameField);
        document.add(new TextField("filePath",file.getCanonicalPath(), Field.Store.YES));
        return document;
    }

    private Document getHTMLDocument(File file) throws IOException {
        Document document=new Document();
        Field fileNameField=new TextField("fileName",file.getName(), Field.Store.YES);
        document.add(fileNameField);
        document.add(new StringField("filePath",file.getCanonicalPath(), Field.Store.YES));
        org.jsoup.nodes.Document doc= Jsoup.parse(file,"UTF-8");
        document.add(new StringField("blogname",doc.getElementById("blogname").text(), Field.Store.YES));
        document.add(new StringField("createdate",doc.getElementById("createdate").text(), Field.Store.YES));
        document.add(new StringField("createname",doc.getElementById("createname").text(), Field.Store.YES));
        document.add(new TextField("helpusername",doc.getElementById("helpusername").text(), Field.Store.YES));
        document.add(new TextField("blgdescription",doc.getElementById("blgdescription").text(), Field.Store.YES));
        document.add(new StringField("blogstate",doc.getElementById("blogstate").text(), Field.Store.YES));
//        document.add(new StringField("createdate",doc.getElementById("createdate").text(), Field.Store.YES));
        return document;
    }

    public void indexFile(File file) throws IOException {
        Document document=getHTMLDocument(file);
        indexWriter.addDocument(document);
        indexWriter.commit();
    }

    public void indexDelFile(File file){
        try {
//            IndexReader reader = DirectoryReader.open(directory);
//            //构建 IndexSearcher
//            IndexSearcher searcher = new IndexSearcher(reader);
//            //标准分词器，会自动去掉空格啊，is a the 等单词
//            Analyzer analyzer = new SmartChineseAnalyzer();
//            //查询解析器
//            QueryParser parser = new QueryParser("filePath", analyzer);
//            //通过解析要查询的 String，获取查询对象，q 为传进来的待查的字符串
//            file=file.replace("/","\\");
//            file=file.substring(1,file.length());
//            System.out.println(file);
//            Query query = parser.parse(file);
            indexWriter.deleteDocuments(new Term("filePath", file.getPath()));
//            indexWriter.forceMergeDeletes();
            indexWriter.commit();
            //关闭
//            indexWriter.close();
//            indexWriter.flush();
//            indexWriter.close();
        }/* catch (ParseException e) {
            e.printStackTrace();
        }*/ catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void indexClear(){
        try {
            if(indexWriter!=null){
                indexWriter.deleteAll();
                indexWriter.commit();
            }
        }  catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void indexAll(File fileDir) throws IOException {
        File[] files = fileDir.listFiles();
        if(null!=files){
            for (File file:files){
                if(file.isFile()){
                    String fileName=file.getName();
                    int beginIndex=fileName.lastIndexOf(".");
                    if(beginIndex>=0){
                        String fileFormat=fileName.substring(beginIndex,fileName.length());
                        if(".HTML".equalsIgnoreCase(fileFormat)||".HTM".equalsIgnoreCase(fileFormat)){

                            logger.info("init"+file.getPath()+"_"+file.getName());
                            indexFile(file);
                        }
                    }
                }else{
                    indexAll(file);
                }
            }
        }
    }






}
