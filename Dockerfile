# Tomcat 9 + Java 8 (레거시 JSP/Servlet에 가장 안정적)
FROM tomcat:9.0-jdk8-temurin

# 기본 webapps 비우기 (선택이지만 추천)
RUN rm -rf /usr/local/tomcat/webapps/*

# WAR 배포
# legacy.war를 ROOT.war로 바꾸면 http://localhost:8085/ 로 바로 접근 가능
COPY legacy.war /usr/local/tomcat/webapps/ROOT.war

# 🔥 JNDI 설정 파일 복사 (가장 중요)
RUN mkdir -p /usr/local/tomcat/conf/Catalina/localhost
COPY ROOT.xml /usr/local/tomcat/conf/Catalina/localhost/ROOT.xml

# Oracle JDBC 드라이버 (JNDI용)
COPY ojdbc8.jar /usr/local/tomcat/lib/

# 포트
EXPOSE 8080

# Tomcat 실행
CMD ["catalina.sh", "run"]