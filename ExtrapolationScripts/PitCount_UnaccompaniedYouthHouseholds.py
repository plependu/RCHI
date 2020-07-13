'''
Unaccompanied Youth-

Unaccompanied youth are persons under age 25 who are not
accompanied by a parent or guardian and are not a parent presenting with or sleeping in the same
place as his/her child(ren). Unaccompanied youth are single youth, youth couples, and groups of
youth presenting together as a household.
'''

import pandas as pd
import csv
from helperFunctions import *

rowList = [['Category', 'Unsheltered', 'Extrapolation']]

#! This file contains the Pit Count for Household with Unaccompanied Youth Households
#* Preprocessing data 
df = pd.read_csv('../Data/PIT2020_FEB26,2020.csv').loc[lambda df: (df['P_Living_Situation'] != 'Couch'), :]

#* filter data to only have unaccompanied youth households
newData = get_Total_Households_UnaccompaniedYouth(df)

'''
Total number of unaccompanied youth households
Total number of unaccompanied youth
Number of unaccompanied youth (under age 18)
Number of unaccompanied youth (age 18 and 24)
'''

rowList.append(['Total number of unaccompanied youth households', totalNumberHouseholds(newData),totalNumberHouseholds(newData)])
rowList.append(['Total number of unaccompanied youth', totalNumberOfPersons(df,newData),totalNumberOfPersons(df,newData)])
rowList.append(['Number of unaccompanied youth (under age 18)', totalNumberOfChildren(df, newData),totalNumberOfChildren(df, newData)])
rowList.append(['Number of unaccompanied youth (age 18 and 24)', totalNumberofYoungAdults(df,newData),totalNumberofYoungAdults(df,newData)])

'''
Gender (unaccompanied youth)
Female
Male
Transgender 
Gender Non-Conforming
'''
genderCategory = ['Female', 'Male' ,'Transgender', 'GenderNonConforming']
extrapolationList = []

for category in genderCategory:
    extrapolationList.append([category, totalGenderCount(df,newData,category), totalGenderCount(df,newData,category, 1)])

CheckingExtrapolation(extrapolationList, df, newData)
rowList += extrapolationList

'''
Ethnicity (unaccompanied youth)
Non-Hispanic/Non-Latino
Hispanic/Latino
'''
ethnicityCategory = [('Non-Hispanic/Non-Latino', 'No'), ('Hispanic/Latino', 'Yes')]
extrapolationList = []

for title, category in ethnicityCategory:
    extrapolationList.append([title,totalEthnicityCount(df,newData,category),totalEthnicityCount(df,newData,category, 1)])

CheckingExtrapolation(extrapolationList, df, newData)
rowList += extrapolationList

'''
Race (unaccompanied youth)
White
Black or African-American
Asian
American Indian or Alaska Native
Native Hawaiian or Other Pacific Islander
Multiple Races
'''
raceCategory = [('White', 'White'), ('Black or African-American', 'Black') , ('Asian', 'Asian'), ('American Indian or Alaska Native', 'AmericanIndian'), ('Native Hawaiian or Other Pacific Islander', 'NativeHawaiian'), ('Multiple Race', 'Multiple Race')]
extrapolationList = []

for title, category in raceCategory:
    extrapolationList.append([title, totalRaceCount(df,newData,category), totalRaceCount(df,newData,category, 1)])

CheckingExtrapolation(extrapolationList, df, newData)
rowList += extrapolationList

'''
Chronically Homeless
Total number of persons
'''
rowList.append(['Total number of persons', totalChronicallyIndividuals(df, newData),totalChronicallyIndividuals(df, newData)])

#* Save in CSV File

with open('./CSV/UnaccompaniedYouthHouseholds.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(rowList)