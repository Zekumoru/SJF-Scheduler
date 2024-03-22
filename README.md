# Schedulers

## Introduction

A web application to emulate schedulers. Currently, two schedulers are supported: **Shortest-Job First (SJF)** and **Round Robin (RR)**.

## Shortest-Job First (SJF) Scheduler

### Concept in a nutshell

The main idea behind SJF is that the shortest job, or process, gets to run first.

Supposed we are given 5 processes:

|PID|Start (seconds)|Duration (seconds)|
|-|-|-|
|0|0|2|
|1|0|4|
|2|0|5|
|3|0|1|
|4|0|2|

Which one do you think will run here first? It's the process with ID `3` or pid `3` because it's the shortest job there is in these 5 processes.

Now imagine the scenario below.

|PID|Start (seconds)|Duration (seconds)|
|-|-|-|
|0|2|2|
|1|0|4|
|2|0|5|
|3|2|1|
|4|3|2|

Which one do you think will run first? PID `3`? Nope! It's PID `1`. Why? Notice that when we first started, there are only PID `4` and PID `5`, it's not until after 2 seconds that we have PID `0` and PID `3` arriving in the system. Therefore, the shortest job available at time 0 is PID `1`.

After finishing PID `1`, which takes 4 seconds to finish, we will be at time 4 with the processes below.

|PID|Start (seconds)|Duration (seconds)|
|-|-|-|
|0|2|2|
|2|0|5|
|3|2|1|
|4|3|2|

Which one do you think will run next? Yup, that's right. Since we're at time 4, we already have all the processes in our system and we know that the shortest job is PID `3`, therefore, it's the one that will be run next.

### Preemptiveness

Preemptiveness of a scheduler allows for a currently running process to stop and let other processes run. In the case above, there was no preemptiveness. We would have to wait for PID `1` with 4 seconds to run those entire 4 seconds before we get to run any other processes.

As you can see, by the time PID `3` arrived in the system, there will be 2 seconds left for PID `1` to finish but we know that PID `3` is shorter than the remaining time of PID `1`. With preemptiveness, we can stop PID `1` and let PID `3` run because we know at that instance of time, it is the currently shortest job.

Let's go back to the starting scenario:

|PID|Start (seconds)|Duration (seconds)|
|-|-|-|
|0|2|2|
|1|0|4|
|2|0|5|
|3|2|1|
|4|3|2|

At time 0, PID `1` will run first then when we reach time 2, PID `0` and PID `3` will arrive. So we get the following table at time 2.

|PID|Start (seconds)|Duration (seconds)|
|-|-|-|
|0|2|2|
|1|0|2|
|2|0|5|
|3|2|1|
|4|3|2|

Notice that PID `1` only has 2 duration left. In this case, with preemptive, since PID `3` is shorter, we will stop PID `1` from executing and start running PID `3`.

### In the web app

With the simulator, you can toggle preemptiveness by clicking on the `Preemptive` toggle.

## Round Robin (RR) Scheduler

### Concept in a nutshell

The Round Robin (RR) scheduler addresses a problem that the SJF scheduler has, which is **starvation**. Starvation means that the process couldn't get to run because it's been pushed behind by other processes therefore it couldn't finish or get the resources it needs (hence "starvation" of resources).

RR works by allocating an amount of time, called a **time slice**, for a process to run. Then after it finishes its allocated time slice, it will go behind other processes so that the next process can run.

One possible implementation of RR is taking the average duration of all processes and making that average duration as the time slice.

### In the web app

The calculation of the time slice in the simulator is already done automatically whenever a process terminates. If the simulator is paused then it is calculated immediately when spawning a process manually.
