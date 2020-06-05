import React, {Component} from 'react';
import { Tree } from 'antd';

class MenuTree extends Component {

    constructor() {
        super();
        this.state = {
            value: 1,
            treeData: [
                { id: 1, pId: 0, value: '1', title: 'Expand to load' },
                { id: 2, pId: 0, value: '2', title: 'Expand to load' },
                { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true },
            ],
        };
    }

    genTreeNode = (parentId, isLeaf = false) => {
        const random = Math.random()
            .toString(36)
            .substring(2, 6);
        return {
            id: random,
            pId: parentId,
            value: random,
            title: isLeaf ? 'Tree Node' : 'Expand to load',
            isLeaf,
        };
    };

    onLoadData = treeNode =>
        new Promise(resolve => {
            const { id } = treeNode.props;
            setTimeout(() => {
                this.setState({
                    treeData: this.state.treeData.concat([
                        this.genTreeNode(id, false),
                        this.genTreeNode(id, true),
                    ]),
                });
                resolve();
            }, 300);
        });

    onChange = value => {
        console.log(value);
        this.setState({ value });
    };


    render() {
        const { TreeNode } = Tree;
        // const { treeData } = this.state;
        return (
            <div>
                <Tree
                    checkable
                    defaultExpandedKeys={['0-0-0', '0-0-1']}
                    defaultSelectedKeys={['0-0-0', '0-0-1']}
                    defaultCheckedKeys={['0-0-0', '0-0-1']}
                    onSelect={this.onSelect}
                    onCheck={this.onCheck}
                >
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="parent 1-0" key="0-0-0" disabled>
                            <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
                            <TreeNode title="leaf" key="0-0-0-1" />
                        </TreeNode>
                        <TreeNode title="parent 1-1" key="0-0-1">
                            <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
                        </TreeNode>
                    </TreeNode>
                </Tree>
            </div>
        );
    }
}

export default MenuTree;
