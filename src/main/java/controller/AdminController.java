package controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import common.Common;
import common.Pagination;
import dto.MemberDTO;
import service.CatalogService;
import service.FaqService;
import service.MagazineService;
import service.MaterialsService;
import service.MemberService;
import service.NoticeService;
import service.ShoppingService;
import serviceImpl.CatalogServiceImpl;
import serviceImpl.FaqServiceImpl;
import serviceImpl.MagazineServiceImpl;
import serviceImpl.MaterialsServiceImpl;
import serviceImpl.MemberServiceImpl;
import serviceImpl.NoticeServiceImpl;
import serviceImpl.ShoppingServiceImpl;

@WebServlet("/Admin/*")
public class AdminController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("utf-8");
		resp.setContentType("text/html; charset=utf-8");
		
		// 로그인 되어 있지 않거나, 관리자가 아닌경우 진입하지 못하도록
		HttpSession session = req.getSession();
		MemberDTO user = (MemberDTO) session.getAttribute("member");
		if (user == null || !"Y".equals(user.getIsadmin()))  {
			resp.sendRedirect("/");
			return;
		}
		
		String action = req.getPathInfo();
		
		// 회원 목록
		if (action.equals("/member")) {
			MemberService ms = new MemberServiceImpl();
			
			Pagination pg = Common.getParameter(req);
			
			req.setAttribute("list", ms.selectMemberAll(pg));
			req.setAttribute("paging", pg.paging(req));
			
		// 회원 수정 페이지 이동
		} else if (action.equals("/update")) {
			String id = req.getParameter("id");
			
			MemberService ms = new MemberServiceImpl();
			req.setAttribute("member", ms.selectMember(id));
			
			req.setAttribute("layout", "/member" + action);
			req.getRequestDispatcher("/layout.jsp").forward(req, resp);
			return;
		
		// 쇼핑	
		} else if (action.equals("/shop")) {	
			ShoppingService ss = new ShoppingServiceImpl();
			
			Pagination pg = Common.getParameter(req);
			
			req.setAttribute("list", ss.qnaAll(0, pg));
			
		// 매거진 목록
		} else if (action.equals("/magazine")) {
			MagazineService ms = new MagazineServiceImpl();
			
			Pagination pg = Common.getParameter(req);
			pg.setPageSize(4);
			
			req.setAttribute("list", ms.magazineList(pg));
			req.setAttribute("paging", pg.paging(req));
			
		// FAQ 목록
		} else if (action.equals("/faq")) {
			FaqService fs = new FaqServiceImpl();
			
			Pagination pg = Common.getParameter(req);
			
			req.setAttribute("list", fs.selectList(pg));
			req.setAttribute("paging", pg.paging(req));
			
		// 카탈로그 목록
		} else if (action.equals("/catalog")) {
			CatalogService cs = new CatalogServiceImpl();
			
			Pagination pg = Common.getParameter(req);
			
			req.setAttribute("list", cs.selectList(pg));
			req.setAttribute("paging", pg.paging(req));
			
		// 조립설명서 목록
		} else if (action.equals("/materials")) {
			MaterialsService ms = new MaterialsServiceImpl();
			
			Pagination pg = Common.getParameter(req);
			pg.setPageSize(5);
			
			req.setAttribute("list", ms.selectList(pg));
			req.setAttribute("paging", pg.paging(req));
			
		// 공지사항 목록
		} else if (action.equals("/notice")) {
			NoticeService ns = new NoticeServiceImpl();
			
			Pagination pg = Common.getParameter(req);
			
			req.setAttribute("list", ns.selectAll(pg));
			req.setAttribute("paging", pg.paging(req));
			
		// 삭제 공통
		} else if (action.equals("/delete")) {
			String _path = req.getParameter("path");
			String _no = req.getParameter("no");
			String _pageNum = req.getParameter("pageNum");
			
			if (_path != null) {
				String tmpPath = _path.substring(_path.lastIndexOf("/"));
				String[] noArr = _no.split(",");
				
				switch (tmpPath) {
				case "/notice"		: new NoticeServiceImpl().deleteNotice(noArr);		break; // 공지사항
				case "/faq"			: new FaqServiceImpl().deleteFaq(noArr);			break; // FAQ
				case "/materials"	: new MaterialsServiceImpl().deleteMaterial(noArr);	break; // 조립 설명서
				case "/catalog"		: new CatalogServiceImpl().deleteCatalog(noArr);	break; // 카탈로그
				case "/magazine"	: new MagazineServiceImpl().magazineDelete(noArr);	break; // 매거진
				case "/member"		: new MemberServiceImpl().memberDelete(noArr);		break; // 회원
				case "/shop"		: new ShoppingServiceImpl().qnaDel(noArr);			break; // 쇼핑
				}
				
			}
			
			if (_pageNum != null) _path += "?pageNum=" + _pageNum;
			
			resp.sendRedirect(_path);
			return;
		}
		
		req.setAttribute("layout", action);
		req.getRequestDispatcher("/jsp/admin/layout.jsp").forward(req, resp);
	}
}
