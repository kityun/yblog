/**
 * Created by paul on 2018/5/31.
 */
function OpenDialog(id,title,url,height,width,callback) {
    height += 'px';
    var pagepath = GetRootPath()+url;
    var dialogInstance = new BootstrapDialog({
        onhidden:callback
    });
    dialogInstance.setId(id);
    dialogInstance.setTitle(title);
    dialogInstance.setMessage($('<div><iframe  src="'+pagepath+'" style="width:100%;height:'+height+';border-width:0 "></iframe></div>'));
    //打开窗口页面增加接受消息监听，在关闭事件后传递消息通知父级页面关闭dialog
    window.addEventListener('message', receiveMessage, false);
    function receiveMessage(tag) {
        var tag = tag.toString();
        if(tag='close'){
            dialogInstance.close();
        }
    }
    //禁止点击空白关闭窗口
    dialogInstance.setCloseByBackdrop(false);
    //如果要改变样式，先调用realize方法
    dialogInstance.realize();
    //原来x关闭按钮也会触发回掉事件，这里把div点击事件重新注册，把dialog的关闭后事件置空
    dialogInstance.getModalHeader().find("[class='bootstrap-dialog-close-button']").unbind('click').click(function () {
        dialogInstance.onHidden(function () {

        })
        dialogInstance.getModal().modal('hide');

    });
    dialogInstance.getModalBody().css('height',height);
    dialogInstance.getModalDialog().css('width',width);
    dialogInstance.getModalBody().css('padding','0');
    dialogInstance.open();
}

function OpenTopDialog(id,title,url,height,width,callback) {
    height += 'px';
    var pagepath = GetRootPath()+url;
    var dialogInstance = new BootstrapDialog({
        istop:true,
        onhidden:callback,
        onshown:function () {
           /* $("div[role='dialog']").appendTo($(window.top.document.body));
            $("div[class^='modal-backdrop']").appendTo($(window.top.document.body));*/
        }
    });
    dialogInstance.setId(id);
    dialogInstance.setTitle(title);
    dialogInstance.setMessage($('<div><iframe  src="'+pagepath+'" style="width:100%;height:'+height+';border-width:0 "></iframe></div>'));
    //打开窗口页面增加接受消息监听，在关闭事件后传递消息通知父级页面关闭dialog
    window.top.addEventListener('message', receiveMessage, false);
    function receiveMessage(tag) {
        var tag = tag.toString();
        if(tag='close'){
            dialogInstance.close();
        }
    }
    //禁止点击空白关闭窗口
    dialogInstance.setCloseByBackdrop(false);
    //如果要改变样式，先调用realize方法
    dialogInstance.realize();
    //原来x关闭按钮也会触发回掉事件，这里把div点击事件重新注册，把dialog的关闭后事件置空
    dialogInstance.getModalHeader().find("[class='bootstrap-dialog-close-button']").unbind('click').click(function () {
        dialogInstance.onHidden(function () {

        })
        dialogInstance.getModal().modal('hide');

    });
    dialogInstance.getModalBody().css('height',height);
    dialogInstance.getModalDialog().css('width',width);
    dialogInstance.getModalBody().css('padding','0');
    dialogInstance.open();

}

function OpenMessage() {

}

function OpenSuccessDialog(message,callback) {
    var dialogInstance = new BootstrapDialog({
        buttons: [{
            label: '确定',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onhidden:callback
    });

    dialogInstance.setTitle('提示信息');
    dialogInstance.setMessage(message);
    dialogInstance.setType(BootstrapDialog.TYPE_SUCCESS);
    dialogInstance.open();
}

function OpenErrorDialog(message) {
    var dialogInstance = new BootstrapDialog({
        buttons: [{
            label: '确定',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
    });
    dialogInstance.setTitle('提示信息');
    dialogInstance.setMessage(message);
    dialogInstance.setType(BootstrapDialog.TYPE_WARNING);
    dialogInstance.open();
}

function OpenConfirmDialog(message,successcallack) {
    var dialogInstance = new BootstrapDialog({
        buttons: [{
            label: '确定',
            action: function (dialogItself) {
                successcallack();
                dialogItself.close();
            }
        },
            {
                label: '取消',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }
        ],
    });
    dialogInstance.setTitle('信息确认');
    dialogInstance.setMessage(message);
    dialogInstance.setType(BootstrapDialog.TYPE_INFO);
    dialogInstance.open();
}

function CloseDialog() {
    //$("[role='dialog']",window.parent.top.document).modal('hide');
    window.parent.postMessage('close', '*');
}

