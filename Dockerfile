FROM harbor-yx-jd.yx.netease.com/yxbasic/yx_node:8.11.3
COPY --chown=webedit:webedit target /home/webapps/${your-service-code}/
COPY --chown=webedit:webedit setenv.sh /home/webdata/${your-service-code}/
