package com.printbank.front_app;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.printbank.front_app.beans.customer.DownloadBean;
import com.printbank.front_app.beans.customer.FaqBean;
import com.printbank.front_app.beans.customer.CustomerNoticeBean;
import com.printbank.front_app.beans.customer.QnaBean;
import com.printbank.front_app.beans.customer.QnaBean.Qnaitem;
import com.printbank.front_app.beans.customer.db.FaQDataBean;
import com.printbank.front_app.beans.customer.db.NoticeDataBean;
import com.printbank.front_app.services.CshService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(value = {"customer"})
@Slf4j
public class CustomerController {
	@Autowired
	private CshService cServ;
	
	@GetMapping(value = {"faq"})
	public FaqBean faq(Model model) {
		cServ.CustomerFaq(model);
		FaqBean faqBean = new FaqBean();
		
		List<FaqBean.Faqbtn> btnList = new ArrayList<FaqBean.Faqbtn>();
		log.info("DATA" + model.getAttribute("Data"));
		for (int i = 0; i < 6; i++) {
			FaqBean.Faqbtn btns = new FaqBean.Faqbtn();
			
			if (i > 0) {
				btns.setActive(false);
			} else {
				btns.setActive(true);
			}
			switch(i) {
				case 0 :
					btns.setText("전체");
					break;
				case 1 :
					btns.setText("배송");
					break;
				case 2 :
					btns.setText("입금/결제");
					break;
				case 3 :
					btns.setText("취소/환불");
					break;
				case 4 :
					btns.setText("데이터관련");
					break;
				case 5 :
					btns.setText("기타");
					break;
			}
			
			
			btnList.add(btns);
		}
		
		faqBean.setBtn(btnList);
		faqBean.setItem((List<FaQDataBean>) model.getAttribute("Data"));
		model.addAttribute("CustomerFaq",faqBean);
		return (FaqBean)model.getAttribute("CustomerFaq");
	}
	
	@GetMapping(value = {"notice"})
	public CustomerNoticeBean notice(Model model) {
		cServ.CustomerNotice(model);
		CustomerNoticeBean noticeBean = new CustomerNoticeBean();
		List<CustomerNoticeBean.Noticebtn> btnList = new ArrayList<CustomerNoticeBean.Noticebtn>();
		
		for (int i = 0; i < 6; i++) {
			CustomerNoticeBean.Noticebtn btns = new CustomerNoticeBean.Noticebtn();
			if (i > 0) {
				btns.setActive(false);
			} else {
				btns.setActive(true);
			}
			
			switch(i) {
			case 0 :
				btns.setText("전체");
				break;
			case 1 :
				btns.setText("상품안내");
				break;
			case 2 :
				btns.setText("배송안내");
				break;
			case 3 :
				btns.setText("취소/환불");
				break;
			case 4 :
				btns.setText("이벤트");
				break;
			case 5 :
				btns.setText("기타");
				break;
			}	
			btnList.add(btns);
		}
		
		noticeBean.setBtn(btnList);
		noticeBean.setItem((List<NoticeDataBean>) model.getAttribute("Data"));
		model.addAttribute("CustomerNotice",noticeBean);
		return (CustomerNoticeBean)model.getAttribute("CustomerNotice");
	}
	
	@GetMapping(value = {"qna"})
	public QnaBean qna(Model model) {
		QnaBean qnaBean = new QnaBean();
		ArrayList<QnaBean.QnaBtn> btnList = new ArrayList<QnaBean.QnaBtn>();
		ArrayList<QnaBean.Qnaitem> itemList = new ArrayList<QnaBean.Qnaitem>();
		
		for (int i = 0; i < 2; i++) {
			QnaBean.QnaBtn btns= new QnaBean.QnaBtn();
			
			btns.setText("문의하기");

			if (i > 0) {
				btns.setActive(false);
			} else {
				btns.setActive(true);
			}

			btnList.add(btns);
		}

		for (int i = 0; i < 7; i++) {
			QnaBean.Qnaitem items = new QnaBean.Qnaitem();

			items.setType("A/S");
			items.setTitle("문의한다는 내용");
			items.setOrederNum("RET2309221097");
			items.setDate("2023.09.21");
			items.setProc("답변완료");
			items.setColor("");
			
			itemList.add(items);
		}
		
		qnaBean.setBtn(btnList);
		qnaBean.setItem(itemList);

		return qnaBean;
	}
	
	@GetMapping(value= {"download"})
	public DownloadBean download(Model model) {
		DownloadBean downloadbean = new DownloadBean();
		ArrayList<DownloadBean.DownloadBtn> btnList = new ArrayList<DownloadBean.DownloadBtn>();
		ArrayList<DownloadBean.Downloaditem> itemList = new ArrayList<DownloadBean.Downloaditem>();

		for (int i = 0; i < 5; i++) {
			DownloadBean.DownloadBtn btns= new DownloadBean.DownloadBtn();
			
			btns.setText("스티커" + i);

			if (i > 0) {
				btns.setActive(false);
			} else {
				btns.setActive(true);
			}
			
			btnList.add(btns);
		}

		for (int i = 0; i < 7; i++) {
			DownloadBean.Downloaditem items = new DownloadBean.Downloaditem();

			items.setNum(9);
			items.setDivide("사각귀돌이 스티커");
			items.setSize("500x500");
			items.setFile_name("JR_500x500_2");
			
			itemList.add(items);
		}
		
		downloadbean.setBtn(btnList);
		downloadbean.setItem(itemList);

		return downloadbean;
	}
}
