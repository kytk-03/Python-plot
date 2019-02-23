import time
from datetime import datetime
import json
import sys
import math
import os

data = json.loads(sys.stdin.readline())
with open(data["Folder Path"] + os.sep + data["File Name"], "a") as f:
    f.write("Time\tSin x\tCos x\n")

starttime = datetime.now()

while True:
    elapsedtime = (datetime.now()-starttime).total_seconds()
    sin = float(data["Amplitude"])*math.sin(elapsedtime/10)
    cos = float(data["Amplitude"])*math.cos(elapsedtime/10)
    output = {"sin x": sin, "cos x": cos, "Time": elapsedtime}
    with open(data["Folder Path"] + os.sep + data["File Name"], "a") as f:
        f.write(str(elapsedtime) + "\t" + str(sin) + "\t" + str(cos) + "\n")
    print(json.dumps(output))
    time.sleep(float(data["Wait Time"]))
