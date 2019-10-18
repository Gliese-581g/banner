            /* 参数
            单位：px;
            移动的目标对象：obj
            计时器函数的单位时间：time;
            单位时间移动的距离与方向：speed;
            要移动的终点（单位已经换算好）：dest;
            移动的距离 （单位已经换算好）：distance;
            移动的方位：drection : left = 0 || top = 1;
            */
           function move(obj, speed, time, dest, drection) {
            clearInterval(obj.timer);
            //判断是操作left还是top
            var distance = parseFloat(obj.style[drection]);
            // if (drection === ("left" || "width")) {
            //     var objSize = parseFloat(getComputedStyle(obj).width);
            // } else {
            //     var objSize = parseFloat(getComputedStyle(obj).height);
            // }
            //判断是加还是减
            if (distance >= dest) {
                speed = -speed;
            }
            //定时器
            obj.timer = setInterval(function () {
                distance = distance + speed;
                //当移动的距离大于目标时，让距离等于目标
                // if (distance + objSize > dest && speed > 0) {
                //     distance = dest - objSize;
                //     clearInterval(obj.timer);
                // } else if (distance < dest && speed < 0) {
                //     distance = dest;
                //     clearInterval(obj.timer);
                // }
                if ((distance > dest && speed > 0) || (distance < dest && speed < 0)) {
                    distance = dest;
                    if (point === true) {
                        timer = setInterval(show, 4000);
                        point = false;
                    }
                    clearInterval(obj.timer);
                }
                obj.style[drection] = distance + "px";
            }, time);
        }