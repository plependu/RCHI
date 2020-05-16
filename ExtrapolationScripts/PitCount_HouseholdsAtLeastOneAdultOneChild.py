import pandas as pd
import csv
from helperFunctions import *

rowList = [['Category', 'Unsheltered']]


#! This file contains the Pit Count for Household with at least one adult and one children
#* Preprocessing data 
df = pd.read_csv('../Data/PIT2020_FEB26,2020.csv').loc[lambda df: (df['P_Living_Situation'] != 'Couch'), :]

#* filter data to only have household with at least one adult and one children.
newData = get_Total_Households_AdultsandChildren(df)


'''
Total number of households
Total Number of persons
Number of Children (under age 18)
Number of young adults (18-24) 
Number of adults (over 24)
'''
rowList.append(['Total number of households', totalNumberHouseholds(newData)])
rowList.append(['Total number of persons (adults & children)', totalNumberOfPersons(df,newData)])
rowList.append(['Number of children (under age 18)', totalNumberOfChildren(df, newData)])
rowList.append(['Number of young adults (age 18 to 24)', totalNumberofYoungAdults(df,newData)])
rowList.append(['Number of adults (over age 24)', totalNumberOfAdults(df,newData)])

'''
GENDER
Female
Male
Transgender
Gender Non-Conforming
'''
genderCategory = ['Female', 'Male' ,'Transgender', 'Gender Non-Conforming']

for category in genderCategory:
    rowList.append([category, totalGenderCount(df,newData,category)])

'''
ETHNICITY
Non-Hispanic/Non-Latino
Hispanic/Latino
'''

#! MUST FORM EXTRAPOLATION 
ethnicityCategory = [('Non-Hispanic/Non-Latino', 'No'), ('Hispanic/Latino', 'Yes')]

for title, category in ethnicityCategory:
    rowList.append([title,totalEthnicityCount(df,newData,category)])

'''
RACE
White
Black
Asian
American Indian
Native Hawaiian
Multiple Race
'''
raceCategory = [('White', 'White'), ('Black or African-American', 'Black') , ('Asian', 'Asian'), ('American Indian or Alaska Native', 'AmericanIndian'), ('Native Hawaiian or Other Pacific Islander', 'NativeHawaiian'), ('Multiple Races', 'Multiple Races')]

for title, category in raceCategory:
    rowList.append([title, totalRaceCount(df,newData,category)])
'''
CHRONICALLY HOMELESS
Total number of households
Total number of persons
'''
rowList.append(['Total number of households', totalChronicallyHouseholds(df,newData)])
rowList.append(['Total number of persons', totalChronicallyIndividuals(df, newData)])

#* Save in CSV File

with open('./CSV/HouseHoldsAdult&Children.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(rowList)



