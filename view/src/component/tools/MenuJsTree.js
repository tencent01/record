import 'jstree/dist/themes/default/style.min.css';
import $ from 'jquery';
import jsTree from 'jstree/dist/jstree';
import React, {Component} from 'react';
import request from "../../network/request";

class MenuJsTree extends Component {



    constructor(props) {
        super(props);
        this.state={
            dirFile:<ul></ul>,
            listKey:1,
            data:[],
        }
        this.dataToView=this.dataToView.bind(this);
    }




    dataToView(data){
        let listitem="<ul>";
        data.forEach(item=>{
            if(item.blogNodes==null){
                listitem+="<li key="+item.name+">"+item.name+"</li>";
            }else{
                console.log(item.name)
                listitem+="<li key="+item.name+">"+item.name+this.dataToView(item.blogNodes)+"</li>"
            }
        });
        listitem+="</ul>";
        return listitem;
    }


    componentDidMount() {

        request.getBlogRootDir().then(response=>{
            return response.json();
        }).then(data=>{
            console.log("data",data)
            this.setState({
                data:data
            },
            ()=>{
                $('#jstree').jstree(
                    {
                        'core':{

                            "themes" : { "stripes" : true },
                            'data':this.state.data,
                        },
                        "types": {
                            "default" : {
                                "valid_children" : ["default","file"]
                            },
                            "file" : {
                                "icon" : "glyphicon glyphicon-file",
                            }
                        },
                        "plugins" : [
                            "contextmenu", "dnd", "search",
                            "state", "types", "wholerow"
                        ]
                    }
                );
            }
            )
            return data;
        })



        $('#jstree').on("changed.jstree", function (e, data) {
            console.log(data.selected);
        });

        $('button').on('click', function () {
            $('#jstree').jstree(true).select_node('child_node_1');
            $('#jstree').jstree('select_node', 'child_node_1');
            $.jstree.reference('#jstree').select_node('child_node_1');
        });
    }


    render() {
        // let a=this.state.data.map((item,index)=>{
        //     return <li key={index}>{item.name}</li>
        // });
        let view=this.dataToView(this.state.data);
        console.log(view);
        return (
            <div id="" className="overflow-auto" style={{width:350,height:1000}}>
                <div id="jstree" >
                    <ul>
                        <li>根节点 1
                            <ul>
                                <li id="child_node_1">子节点1</li>
                                <li>子节点2</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <button>演示按钮</button>
            </div>
        );
    }
}

export default MenuJsTree;









/*<ul>
    <li>根节点 1
        <ul>
            <li id="child_node_1">子节点1</li>
            <li>子节点2</li>
        </ul>
    </li>

    <li>根节点 1
        <ul>
            <li id="child_node_2">子节点1</li>
            <li>子节点2</li>
            <li>根节点 1
                <ul>
                    <li id="child_node_3">子节点1</li>
                    <li>子节点2</li>
                    <li>根节点 1
                        <ul>
                            <li id="child_node_4">子节点1</li>
                            <li>子节点2</li>
                            <li>根节点 1
                                <ul>
                                    <li id="child_node_5">子节点1</li>
                                    <li>子节点2</li>
                                    <li>根节点 1
                                        <ul>
                                            <li id="child_node_6">子节点1</li>
                                            <li>子节点2</li>
                                            <li>根节点 1
                                                <ul>
                                                    <li id="child_node_7">子节点1</li>
                                                    <li>子节点2</li>
                                                    <li>根节点 1
                                                        <ul>
                                                            <li id="child_node_8">子节点1</li>
                                                            <li>子节点2</li>
                                                            <li>根节点 1
                                                                <ul>
                                                                    <li id="child_node_9">子节点1</li>
                                                                    <li>子节点2</li>
                                                                    <li>根节点 1
                                                                        <ul>
                                                                            <li id="child_node_10">子节点1</li>
                                                                            <li>子节点2</li>
                                                                            <li>根节点 1
                                                                                <ul>
                                                                                    <li id="child_node_11">子节点1</li>
                                                                                    <li>子节点2</li>
                                                                                    <li>根节点 1
                                                                                        <ul>
                                                                                            <li id="child_node_12">子节点1</li>
                                                                                            <li>子节点2</li>
                                                                                            <li>根节点 1
                                                                                                <ul>
                                                                                                    <li id="child_node_13">子节点1</li>
                                                                                                    <li>子节点2</li>
                                                                                                    <li>根节点 1
                                                                                                        <ul>
                                                                                                            <li id="child_node_14">子节点1</li>
                                                                                                            <li>子节点2</li>
                                                                                                            <li>根节点 1
                                                                                                                <ul>
                                                                                                                    <li id="child_node_15">子节点1</li>
                                                                                                                    <li>子节点2</li>
                                                                                                                </ul>
                                                                                                            </li>
                                                                                                        </ul>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </li>
                                                                                </ul>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
    <li>根节点 2</li>
</ul>*/
