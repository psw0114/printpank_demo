package com.printbank.front_app;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
	@GetMapping(value = {"bucket_list"})
	public String bucketList(Model model) {
		return "bucket_list";
	}
	
	@GetMapping(value = {"category"})
	public String category(Model model) {
		return "category";
	}
	
	@GetMapping(value = {"customer"})
	public String customer(Model model) {
		return "customer";
	}
	
	@GetMapping(value = {"event"})
	public String event(Model model) {
		return "event";
	}
	
	@GetMapping(value = {"", "main"})
	public String main(Model model) {
		return "main";
	}
	
	@GetMapping(value = {"my_page"})
	public String myPage(Model model) {
		return "my_page";
	}
	
	@GetMapping(value = {"product"})
	public String product(Model model) {
		return "product";
	}
	
	@GetMapping(value = {"signin"})
	public String signin(Model model) {
		return "signin";
	}
	
	@GetMapping(value = {"signup"})
	public String signup(Model model) {
		return "signup";
	}
}
