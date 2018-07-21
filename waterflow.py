import RPi.GPIO as GPIO
import time, sys
GPIO.setmode(GPIO.BOARD)
inpt = 11
GPIO.setup(inpt,GPIO.IN)
rate_cnt = 0
tot_cnt = 0
minutes = 0
constant = 0.10
time_new = 0.0

print('Water Flow - Approximate')
print('Control c to exit')

while True:
    time_new = time.time() + 60
    rate_cnt = 0
    while time.time() &lt;= time_new:
        if GPIO.input(inpt)!= 0:
            rate_cnt += 1
            tot_cnt += 1
        try:
           print(GPIO.input(inpt), end='')
        except KeyboardInterrupt:
           print('\nCTRL C - Exiting nicely')
           GPIO.cleanup()
           sys.exit()
    minutes += 1
    print('\nLiters / min',round(rate_cnt * constant,4))
    print('Total liters', round(tot_cnt * constant,4))
    print('Time (min & clock) ', minutes, '\t', time.asctime(time.localtime()))

GPIO.cleanup()
print('Done')]