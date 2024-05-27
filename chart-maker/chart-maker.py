import matplotlib.pyplot as plt
from matplotlib.pyplot import figure
import json
from datetime import datetime
from textwrap import wrap

dictionary = json.load(open('expense-summary.json', 'r'))
xAxis = [key for key, value in dictionary.items()]
yAxis = [value for key, value in dictionary.items()]

plt.grid(True)

plt.plot(xAxis,yAxis, color='blue', marker='o')

#plt.show()
current_date = datetime.today()
summary_figure_name = str(current_date) + '.png'
plt.xticks(rotation=45)
#plt.show()

plt.savefig(summary_figure_name, bbox_inches = 'tight')
