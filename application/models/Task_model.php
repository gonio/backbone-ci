<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/**
 * Created by DOKE.
 * Date: 2016/7/1
 * Time: 9:40
 */
class Task_model extends CI_Model {

    private $db;
    private $_args = null;
    private $dept_name = array();
    private $msg = '';

    public function __construct() {
        parent::__construct();
        $this->db = $this->load->database('default', true);
        $this->load->library('form_validation');
        $this->_args = $this->input->post();
    }

    public function index() {
        return $this->query();
    }
    public function create() {
        //获取部门
        $this->db->trans_start();
        try {
            $user_dept = $this->db->query('select user_dept from tb_user where user_id=' .
                $this->_args['user_id'])->result_array();
            $user_dept = $user_dept[0]['user_dept'] ?? 0;
            $data = array(
                'task_type' => $this->_args['task_type'],
                'online_type' => $this->_args['online_type']??0,
                'customer_name' => $this->_args['customer_name']??'',
                'customer_industry' => $this->_args['customer_industry']??0,
                'customer_rel' => $this->_args['customer_rel']??0,
                'project_name' => $this->_args['project_name']??'',
                'project_level' => $this->_args['project_level']??0,
                'customer_contact_name' => $this->_args['customer_contact_name'],
                'customer_contact_tel' => $this->_args['customer_contact_tel'],
                'sale_name' => $this->_args['sale_name'],
                'sale_tel' => $this->_args['sale_tel'],
                'arrive_time' => date('Y/m/d H:i:s', strtotime($this->_args['arrive_time'])),
                'man_hour' => $this->_args['man_hour']??0,
                'test_desc' => $this->_args['test_desc']??'',
                'test_competitor' => $this->_args['test_competitor']??'',
                'desc1' => $this->_args['desc'],
                'create_time' => date("Y-m-d H:i:s"),
                'create_user' => $this->_args['user_id'],
                'create_dept' => $user_dept,
                'mod_time' => date("Y-m-d H:i:s"),
            );

            $this->db->insert('tb_task', $data);
        } catch (Exception $e) {
            $this->db->trans_complete(false);
            $this->msg = $e->getMessage();
            return false;
        }
        $this->db->trans_complete();
        return true;
    }

    /**
     * @return array|bool
     */
    private function query() {
        $this->db->trans_start();
        try {
            $this->db->select('tb_task.task_id,tb_task.task_type,tb_task.customer_name,'.
                'tb_task.project_name,tb_task.create_user,tb_task.arrive_time,'.
                'tb_task.man_hour,tb_dept.dept_name,tb_user.user_name')
                ->from('tb_task');
            $this->db->join('tb_user','tb_task.create_user=tb_user.user_id ','left');
            $this->db->join('tb_dept','tb_task.create_dept=tb_dept.dept_id ','left');
            $this->db->order_by('tb_task.arrive_time', 'ASC');
            $this->getCondition();
            $result = $this->db->get()->result_array();
        } catch (Exception $e) {
            $this->db->trans_complete(false);
            $this->msg = $e->getMessage();
            return false;
        }
        $this->db->trans_complete();

        return $this->formatData($result);
    }

    /**
     * @return bool
     * @throws Exception
     */
    public function detail() {
        $task_id = $this->_args['task_id'];
        $this->db->trans_start();
        try {
            $this->db->select('*')->from('tb_task');
            $this->db->join('tb_user','tb_task.create_user=tb_user.user_id ','left');
            $this->db->where('task_id',$task_id);
            $result = $this->db->get()->result_array();
        } catch (Exception $e) {
            $this->db->trans_complete(false);
            $this->msg = $e->getMessage();
            return false;
        }
        $this->db->trans_complete();

        if(!isset($result[0])){
            $this->msg = '该记录不存在，请刷新后再试';
            return false;
        } else {
            $result = $result[0];
        }
        $result['user_id'] = $result['create_user'];
        $result['create_user'] = $result['user_name'];
        $result['desc'] = $result['desc1'];
        $time = strtotime($result['arrive_time']);
        $result['arrive_time'] = date('Y-m-d', $time).'T'.date('H:i:s', $time);
        $result['title'] = ($result['customer_name']===''?
                $result['project_name']:$result['customer_name']).
            '['.$result['create_user'].']'.'-'.getTskType($result['task_type']);
        return $result;
    }

    public function update() {
        $this->db->trans_start();
        try {
            $this->db->select('*')->from('tb_task');
            $this->db->join('tb_user','tb_task.create_user=tb_user.user_id ','left');
            $this->db->where('task_id',$this->_args['task_id']);
            $result = $this->db->get()->result_array();
            if(!isset($result[0])){
                $this->msg = '该记录不存在，请刷新后再试';
                return false;
            } else {
                $result = $result[0];
            }
            if($this->_args['user_id'] != $result['create_user']){
                $this->db->trans_complete();
                $this->msg = '只有创建人能修改该记录';
                return false;
            }
            $data = array(
                'task_type' => $this->_args['task_type'],
                'online_type' => $this->_args['online_type']??0,
                'customer_name' => $this->_args['customer_name']??'',
                'customer_industry' => $this->_args['customer_industry']??0,
                'customer_rel' => $this->_args['customer_rel']??0,
                'project_name' => $this->_args['project_name']??'',
                'project_level' => $this->_args['project_level']??0,
                'customer_contact_name' => $this->_args['customer_contact_name'],
                'customer_contact_tel' => $this->_args['customer_contact_tel'],
                'sale_name' => $this->_args['sale_name'],
                'sale_tel' => $this->_args['sale_tel'],
                'arrive_time' => date('Y/m/d H:i:s', strtotime($this->_args['arrive_time'])),
                'man_hour' => $this->_args['man_hour']??0,
                'test_desc' => $this->_args['test_desc']??'',
                'test_competitor' => $this->_args['test_competitor']??'',
                'desc1' => $this->_args['desc'],
                'mod_time' => date("Y-m-d H:i:s")
            );
            $this->db->where('task_id',$this->_args['task_id']);
            $this->db->update('tb_task', $data);
        } catch (Exception $e) {
            $this->db->trans_complete(false);
            $this->msg = $e->getMessage();
            return false;
        }

        $this->db->trans_complete();
        return true;
    }

    public function delete() {
        $result = $this->db->query('select create_user from tb_task where task_id='.
            $this->_args['task_id'])->result_array();
        if(!isset($result[0])){
            $this->msg = '该记录不存在，请刷新后再试';
            return false;
        } else {
            $result = $result[0];
        }
        if($this->_args['user_id'] != $result['create_user']){
            $this->msg = '只有创建人能删除安排';
            return false;
        }
        $this->db->query('delete from tb_task where task_id='.$this->_args['task_id']);
        return true;
    }

    /**
     * @param $result
     * @return array
     * * 格式化返回数据
     */
    private function formatData($result) {
        $data = array();
        $task = array();
        $dept = array();
        $week = array(0,0,0,0,0,0,0);
        $specify = '';

        //可查看的办事处不止一个时，加上全部选项
        if(count($this->dept_name) > 1) {
            $dept[] = '全部办事处';
        }
        //获取可查看的部门
        foreach ($this->dept_name as $value) {
            $dept[] = $value['dept_name'];
        }
        $data['user']['dept'] = $dept;

        //获取安排列表
        //是否指定某一天
        if(isset($this->_args['specify'])){
            $specifyTask = array();
            $specify = date('w', intval($this->_args['specify']/1000));
            foreach ($result as $key => $value) {
                $day = date('Y/m/d',strtotime($value['arrive_time']));
                if($day==date('Y/m/d', intval($this->_args['specify']/1000))){
                    $specifyTask[$day][] = array(
                        'title'=> $value['customer_name']===''?$value['project_name']:$value['customer_name'],
                        'type'=> $value['task_type'],
                        'name'=> $value['user_name'],
                        'arrive_time'=> date('H:i',strtotime($value['arrive_time'])),
                        'period'=> $value['man_hour'],
                        'task_id'=> $value['task_id']
                    );
                }
                //为了计算出本周繁忙度
                $task[$day][] = array();
            }
            $data['task'] = $specifyTask;
        } else {
            foreach ($result as $key => $value) {
                $day = date('Y/m/d',strtotime($value['arrive_time']));
                $task[$day][] = array(
                    'title'=> $value['customer_name']===''?$value['project_name']:$value['customer_name'],
                    'type'=> $value['task_type'],
                    'name'=> $value['user_name'],
                    'arrive_time'=> date('H:i',strtotime($value['arrive_time'])),
                    'period'=> $value['man_hour'],
                    'task_id'=> $value['task_id']
                );
            }
            $data['task'] = $task;
        }

        //获取一周任务繁忙度
        foreach ($task as $key => $value) {
            $week[date('w',strtotime($key))] = getWeekCls(count($value));
        }
        if(''!==$specify){
            $week[$specify] .= ' selected';
        }
        //周日序号为0，为方便js遍历，要把周日调到数组末尾
        $week[] = $week[0];
        unset($week[0]);
        $data['week'] = $week;

        return $data;
    }

    private function getDate() {
        $date = $this->_args['year'].'-'.($this->_args['month']+1).'-'.$this->_args['day'];
        return $date;
    }

    public function getMessage() {
        return $this->msg;
    }

    /**
     * where条件设置
     */
    private function getCondition() {
        $date = getOneWeek($this->getDate());
        $this->db->where('arrive_time >',$date['begin']);
        $this->db->where('arrive_time <',$date['end']);
        //过滤办事处
        $result = $this->db->query('select tb_user.user_dept_permission,tb_dept.dept_name '.
            'from tb_user left join tb_dept on tb_user.user_dept=tb_dept.dept_id '.
            'where tb_user.user_id='.$this->_args['user_id'])->result_array();
        $permission = $result[0]['user_dept_permission'] ?? 0;
        if(isset($this->_args['dept']) && $this->_args['dept'] != 0){
            $this->db->where('tb_task.create_dept',$this->_args['dept']);
        }
        //拥有管理员查看权限
        if($permission == 0){
            $this->dept_name = $this->db->query('select dept_name from tb_dept ')->result_array();
        } else {
            $permissionArr = explode(",", $permission);
            $this->db->where_in('tb_task.create_dept',$permissionArr);
            $this->dept_name = $this->db->query('select dept_name from tb_dept '.
                'where dept_id in('.$permission.')')->result_array();
        }

    }
}