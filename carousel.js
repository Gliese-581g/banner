        window.onload = init;

        function init() {
            const figure = document.querySelector(".figure");
            const count = document.querySelectorAll(".figure img").length;
            figure.style.width = count * 480 + "px";
            //圆点下标
             const radius = document.querySelector(".radius");
            const circles = document.querySelectorAll(".radius li");
            let index = 0;
            let final = 0;
            //箭头按钮
            const left = document.querySelector(".left");
            const right = document.querySelector(".right");
            let point = false;
            let timer;
            //圆点按钮切换函数
            let style = {
                clear: function (objs, index) {
                    objs[index].style.backgroundColor = "";
                    objs[index].style.opacity = "";
                },
                set: function (objs, index) {
                    objs[index].style.backgroundColor = "#fff";
                    objs[index].style.opacity = "1";
                }
            };
            //轮播图动画
            function show() {
                style.clear(circles, index);
                if (final === -((count - 1) * 480)) {
                    figure.style.left = "0px";
                    final = 0;
                }
                index++;
                if (index > circles.length - 1) {
                    index = 0;
                }
                style.set(circles, index);
                final = final - 480;
                move(figure, 100, 50, final, "left");
            }

            //自动切换图片
            timer = setInterval(show, 4000);
            //向右
            right.onclick = function () {
                point = true;
                clearInterval(timer);
                show();
            };
            //向左
            left.onclick = function () {
                point = true;
                clearInterval(timer);
                style.clear(circles, index);
                if (final === 0) {
                    figure.style.left = -((count - 1) * 480) + "px";
                    final = -((count - 1) * 480);
                }
                final = final + 480;
                move(figure, 100, 50, final, "left");
                index--;
                if (index < 0) {
                    index = circles.length - 1;
                }
                style.set(circles, index);
            };
            //圆点下标按钮切换函数
            radius.onclick = function (e) {
                if (e.target.id !== "") {
                    let key = parseInt(e.target.id);
                    point = true;
                    clearInterval(timer);
                    style.clear(circles, index);
                    index = key;
                    style.set(circles, index);
                    final = -(480 * key);
                    move(figure, 100, 50, final, "left");
                }
            };
            /* 参数
            单位：px;
            移动的目标对象：obj
            计时器函数的单位时间：time;
            单位时间移动的距离与方向：speed;
            要移动的终点（单位已经换算好）：dest;
            移动的距离 （单位已经换算好）：distance;
            移动的方位：direction : left = 0 || top = 1;
            */
            function move(obj, speed, time, dest, direction) {
                clearInterval(obj.timer);
                //判断是操作left还是top
                let distance = parseFloat(obj.style[direction]);
                //判断是加还是减
                if (distance >= dest) {
                    speed = -speed;
                }
                //定时器
                obj.timer = setInterval(function () {
                    distance = distance + speed;
                    if ((distance > dest && speed > 0) || (distance < dest && speed < 0)) {
                        distance = dest;
                        if (point === true) {
                            timer = setInterval(show, 4000);
                            point = false;
                        }
                        clearInterval(obj.timer);
                    }
                    obj.style[direction] = distance + "px";
                }, time);
            }
        }