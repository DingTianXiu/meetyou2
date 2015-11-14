/**
 * Created by meetyou on 2015/10/14.
 */





        var img = document.getElementById('jobChooseImg');
        var jobDIV = document.getElementsByClassName('jobVacancy');
        var job = document.getElementsByTagName('p');

        for(i=0;i<=job.length;i++){
            job[i].index = i;
            job[i].onclick = function(){
                job[i].style.marginLeft = 28+this.index*142+'px';
                job[i].style.color = '#a1cd7c';
            }
        }