package com.printbank.front_app;

import java.util.ArrayList;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.printbank.front_app.beans.signup.ButtonBean;
import com.printbank.front_app.beans.signup.TermsBean;

@RestController
@RequestMapping(value = {"signup"})
public class SignUpController {

	@GetMapping(value = {"term"})
	public TermsBean term (Model model) {
		TermsBean term = new TermsBean();
		ArrayList<TermsBean.TermItemBean> termlist = new ArrayList<TermsBean.TermItemBean>();
		ArrayList<TermsBean.ButtonItemBean> blist = new ArrayList<TermsBean.ButtonItemBean>();
		
		for (int i = 1; i < 4; i++) {
			TermsBean.TermItemBean item = new TermsBean.TermItemBean();
			
			item.setTitle("term_title_" + i);
			item.setText("term_text_" + i);
			item.setChecked(false);
			
			termlist.add(item);
		}
		
		for (int i = 0; i < 2; i++) {
			TermsBean.ButtonItemBean item = new TermsBean.ButtonItemBean();
			
			item.setTitle("button_title_" + i);
			item.setDesc("button_desc_" + i);
			item.setType(((i % 2) == 0) ? "A" : "B");
			
			blist.add(item);
		}
		
		term.setTerms(termlist);
		term.setButton(blist);
		
		return term;
	}
	
//	@GetMapping(value = {"button"})
//	public ButtonBean button (Model model) {
//		ButtonBean button = new ButtonBean();
//		ArrayList<ButtonBean.ButtonItemBean> blist = new ArrayList<ButtonBean.ButtonItemBean>();
//		
//		for (int i = 0; i < 2; i++) {
//			ButtonBean.ButtonItemBean item = new ButtonBean.ButtonItemBean();
//			
//			item.setTitle("button_title_" + i);
//			item.setDesc("button_desc_" + i);
//			item.setType(((i % 2) == 0) ? "A" : "B");
//			
//			blist.add(item);
//		}
//		
//		button.setButton(blist);
//		
//		return button;
//	}
}
