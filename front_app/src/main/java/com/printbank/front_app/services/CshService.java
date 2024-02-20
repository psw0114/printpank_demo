package com.printbank.front_app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

//import com.printbank.front_app.beans.main.BannerBean;
//import com.printbank.front_app.beans.main.NoticeBean;
//import com.printbank.front_app.beans.main.ReviewBean;
//import com.printbank.front_app.beans.test.PbMasterKeyBean;
//import com.printbank.front_app.beans.test.PbRequestBean;
//import com.printbank.front_app.beans.test.PbResponseBean;
import com.printbank.front_app.common.SimpleTransactionManager;
import com.printbank.front_app.common.TransactionAssistant;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CshService extends TransactionAssistant {
	@Autowired
	private SimpleTransactionManager tranManager;
	
//	public void MainBanner(Model model) {
//		BannerBean ban = new BannerBean();
//		try {
//			String type= "A";
//			this.tranManager = this.getTransaction(true);
//			this.tranManager.tranStart();
//			ban.setBanner(printbankSession.selectList("selectBanner",type));
//		} catch (Exception e) {
//			e.printStackTrace();
//		} finally {
//			this.tranManager.tranEnd();
//			model.addAttribute("Data", ban);
//		}
//	}
//	
//	public void NoticeBanner(Model model) {
//		NoticeBean notice = new NoticeBean();
//		try {
//			this.tranManager = this.getTransaction(true);
//			this.tranManager.tranStart();
//
//			String type= "C";
//			notice.setBanner(printbankSession.selectList("selectBanner",type));
//			notice.getBanner().get(0).setAlt("NoticeBanner_1");
//			notice.setNotice(printbankSession.selectList("selectMainNotice"));
//			
//		} catch (Exception e) {
//			e.printStackTrace();
//		} finally {
//			this.tranManager.tranEnd();
//			model.addAttribute("Data", notice);
//		}
//	}
//	
//	public void MainReview(Model model) {
//		ReviewBean rev = new ReviewBean();
//		try {
//			this.tranManager = this.getTransaction(true);
//			this.tranManager.tranStart();
//			rev.setReview(printbankSession.selectList("selectMainReview"));
//		} catch (Exception e) {
//			e.printStackTrace();
//		} finally {
//			this.tranManager.tranEnd();
//			model.addAttribute("Data", rev);
//		}
//	}
//	
//	public void SubBanner(Model model) {
//		BannerBean subban = new BannerBean();
//		try {
//			this.tranManager = this.getTransaction(true);
//			this.tranManager.tranStart();
//			String type= "D";
//			subban.setBanner(printbankSession.selectOne("selectBanner",type));
//		} catch (Exception e) {
//			e.printStackTrace();
//		} finally {
//			this.tranManager.tranEnd();
//			model.addAttribute("Data", subban);
//		}
//	}
	
	public void Category(Model model) {
		try {
			this.tranManager = this.getTransaction(true);
			this.tranManager.tranStart();
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			this.tranManager.tranEnd();
			model.addAttribute("Data", printbankSession.selectList("selectCategoryProduct"));
		}
	}
	
	public void CustomerFaq(Model model) {
		try {
			this.tranManager = this.getTransaction(true);
			this.tranManager.tranStart();
		
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			this.tranManager.tranEnd();
			model.addAttribute("Data", printbankSession.selectList("selectCustomerFaq"));
		}
	}
	
	public void CustomerNotice(Model model) {
		try {
			this.tranManager = this.getTransaction(true);
			this.tranManager.tranStart();
			
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			this.tranManager.tranEnd();
			model.addAttribute("Data", printbankSession.selectList("selectCustomerNotice"));
		}
	}

	
	
//	public void getMasterKeyData(Model model) {
//		PbRequestBean req = (PbRequestBean)model.getAttribute("PbRequest");
//		PbResponseBean res = (PbResponseBean)model.getAttribute("PbResponse");
//		
//		PbMasterKeyBean masterkeys = new PbMasterKeyBean();
//		
//		for(String masterKey:req.getMasterKey()) {
//			switch(masterKey) {
//			case "HEADER":
//				masterkeys.setPbMasterHeader(this.printbankSession.selectList("getHeaderInfo"));	
//				break;
//			case "FOOTER":
//				break;
//			}
//		}
//	}
}
