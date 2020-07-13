import pandas as pd
import csv
from helperFunctionsObersvation import *

rowList = [['Category', 'Unsheltered', 'Extrapolation']]

#! This file contains the Pit Count for households without children
#* Preprocessing data 
df = pd.read_csv('../Data/PIT2020_FEB26,2020.csv').loc[lambda df: (df['P_Living_Situation'] != 'Couch'), :]

#* filter data to only have household without children
newData = get_Total_Households_VeteransWithoutChildren(df)

'''
Total number of households
Total number of persons
Number of young adults (age 18 to 24)
Number of adults (over age 24)
'''
rowList.append(['Total number of households', totalNumberHouseholds(newData),extrapolationVeteranHousehold(df,newData)])
rowList.append(['Total number of persons', totalNumberOfPersons(df,newData),extrapolationVeteranTotalPersons(df,newData)])
rowList.append(['Total number of Veterans', getTotalVeterans(df,newData),extrapolationTotalVeterans(df,newData)])

'''
GENDER
Female
Male
Transgender
Gender Non-Conforming
'''
genderCategory = ['Female', 'Male' ,'Transgender', 'GenderNonConforming']
extrapolationList = []

for category in genderCategory:
    extrapolationList.append([category, totalGenderCount(df,newData,category), totalGenderCount(df,newData,category, 1,'Veteran')])

CheckingExtrapolation(extrapolationList, df, newData, 'Veteran')
rowList += extrapolationList

'''
ETHNICITY
Non-Hispanic/Non-Latino
Hispanic/Latino
'''

#! MUST FORM EXTRAPOLATION 
ethnicityCategory = [('Non-Hispanic/Non-Latino', 'No'), ('Hispanic/Latino', 'Yes')]
extrapolationList = []

for title, category in ethnicityCategory:
    extrapolationList.append([title,totalEthnicityCount(df,newData,category),totalEthnicityCount(df,newData,category, 1,'Veteran')])

CheckingExtrapolation(extrapolationList, df, newData,'Veteran')
rowList += extrapolationList

'''
RACE
White
Black
Asian
American Indian
Native Hawaiian
Multiple Race
'''
raceCategory = [('White', 'White'), ('Black or African-American', 'Black') , ('Asian', 'Asian'), ('American Indian or Alaska Native', 'AmericanIndian'), ('Native Hawaiian or Other Pacific Islander', 'NativeHawaiian'), ('Multiple Race', 'Multiple Race')]
extrapolationList = []

for title, category in raceCategory:
    extrapolationList.append([title, totalRaceCount(df,newData,category), totalRaceCount(df,newData,category, 1,'Veteran')])

CheckingExtrapolation(extrapolationList, df, newData,'Veteran')
rowList += extrapolationList

'''
CHRONICALLY HOMELESS
Total number of persons
'''
rowList.append(['Total number of persons', totalChronicallyIndividuals(df,newData),totalChronicallyIndividuals(df,newData,1,'Veteran')])

#* Save in CSV File

with open('./CSV/VeteransHouseholdsWithoutChildren.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(rowList)
