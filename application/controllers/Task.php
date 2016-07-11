<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Task extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('common');
		$this->load->model('task_model', 'model');
	}
	public function index() {
		$rs = $this->model->index();
		$this->output
			->set_content_type('application/json')
			->set_output(outputFormat($rs, $this->model->getMessage()));
	}

	public function create() {
		$rs = $this->model->create();
		$this->output
			->set_content_type('application/json')
			->set_output(outputFormat($rs, $this->model->getMessage()));
	}

	public function detail() {
		$rs = $this->model->detail();
		$this->output
			->set_content_type('application/json')
			->set_output(outputFormat($rs, $this->model->getMessage()));
	}

	public function update() {
		$rs = $this->model->update();
		$this->output
			->set_content_type('application/json')
			->set_output(outputFormat($rs, $this->model->getMessage()));
	}

	public function delete() {
		$rs = $this->model->delete();
		$this->output
			->set_content_type('application/json')
			->set_output(outputFormat($rs, $this->model->getMessage()));
	}
}
