<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by DOKE.
 * Date: 2016/7/4
 * Time: 17:06
 */

/**
 * @param bool|true $rs 是否成功
 * @param string $msg   错误信息
 * @return string
 * 格式化输出
 */
function outputFormat($rs = true, $msg = '') {
    if($rs){
        if(is_array($rs)){
            $rs['success'] = true;
            return json_encode($rs);
        } else {
            return json_encode(array(
                'success'   => true
            ));
        }
    } else {
        return json_encode(array(
            'success'   => false,
            'msg'       => $msg
        ));
    }
}

/**
 * @param $today    
 * @return array
 * 获取本周开始、结束时间
 */
function getOneWeek($today) {
    if(is_null($today)){
        $today = date('Y-m-d H:i:s');
    }
    $date = array();
    $day = date('w',strtotime($today)) - 1;
    $week_start = $date['begin'] = date('Y-m-d H:i:s',strtotime("$today -".$day.' days'));
    $date['end'] = date('Y-m-d H:i:s',strtotime("$week_start +7 days"));
    return $date;
}

/**
 * @param $count
 * @return int
 * 转成前端颜色样式序号
 */
function getWeekCls($count) {
    $cfg = array(
        0 => 0,
        1 => 1,
        2 => 1,
        3 => 2
    );
    return $cfg[$count]??2;
}

function getTskType($type) {
    $cfg = array(
        '1' => '测试',
		'2' => '实施',
		'3' => '售后',
		'4' => '售前',
		'5' => '其他'
    );
    return $cfg[$type];
}
