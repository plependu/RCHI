'''
Parenting Youth - 
A youth who identifies as the parent or legal guardian of one or more children
who are present with or sleeping in the same place as that youth parent, where there is no person over
age 24 in the household.
'''

#! CAN NOT PROPERLY CREATE SCRIPT WAIT FOR TEAM TO ANSWER

import pandas as pd
import csv
from helperFunctions import *


rowList = [['Category', 'Unsheltered']]

#! This file contains the Pit Count for Parenting Youth Households.

#* Preprocessing data 
df = pd.read_csv('../Data/PIT2020_FEB26,2020.csv').loc[lambda df: (df['P_Living_Situation'] != 'Couch'), :]

#* filter data to only have Parenting Youth Households
newData = get_Total_Households_ParentingYouth(df)


'''
Total number of parenting youth households
Total number of persons in parenting youth households
Total Parenting Youth (youth parents only)
Total Children in Parenting Youth Households
Number of parenting youth under age 18
Children in households with parenting youth under age 18
Number of parenting youth age 18 to 24
Children in households with parenting youth age 18 to 24
'''
rowList.append(['Total number of parenting youth households', totalNumberHouseholds(newData)])
rowList.append(['Total number of persons in parenting youth households', totalNumberOfPersons(df,newData)])

# rowList.append(['Total Parenting Youth (youth parents only)', totalNumberYouthParent(df, newData)]) #!
# rowList.append(['Total Children in Parenting Youth Households', totalNumberChildrenParentYouth(df,newData)]) #!
# rowList.append(['Number of parenting youth under age 18', totalNumberParentUnder18(df, newData)]) #!
# rowList.append(['Children in households with parenting youth under age 18', totalNumberChildrenWithParentUnder18(df, newData)]) #!
# rowList.append(['Number of parenting youth age 18 to 24', totalNumberParent18to24(df,newData)]) #!
# rowList.append(['Children in households with parenting youth age 18 to 24', totalNumberChildrenwithParent18to24(df,newData)]) #!

# '''
# Gender (unaccompanied youth)
# Female
# Male
# Transgender 
# Gender Non-Conforming
# '''
# genderCategory = ['Female', 'Male' ,'Transgender', 'Gender Non-Conforming']

# for category in genderCategory:
#     rowList.append([category, totalGenderCount(df,newData,category)])

# '''
# Ethnicity (unaccompanied youth)
# Non-Hispanic/Non-Latino
# Hispanic/Latino
# '''
# ethnicityCategory = [('Non-Hispanic/Non-Latino', 'No'), ('Hispanic/Latino', 'Yes')]

# for title, category in ethnicityCategory:
#     rowList.append([title,totalEthnicityCount(df,newData,category)])

# '''
# Race (unaccompanied youth)
# White
# Black or African-American
# Asian
# American Indian or Alaska Native
# Native Hawaiian or Other Pacific Islander
# Multiple Races
# '''
# raceCategory = [('White', 'White'), ('Black or African-American', 'Black') , ('Asian', 'Asian'), ('American Indian or Alaska Native', 'AmericanIndian'), ('Native Hawaiian or Other Pacific Islander', 'NativeHawaiian'), ('Multiple Races', 'Multiple Races')]

# for title, category in raceCategory:
#     rowList.append([title, totalRaceCount(df,newData,category)])

# '''
# Chronically Homeless
# Total number of persons
# '''
# rowList.append(['Total number of households', totalChronicallyHouseholds(df,newData)])
# rowList.append(['Total number of persons', totalChronicallyIndividuals(df, newData)])

# #* Save in CSV File

# with open('./CSV/UnaccompaniedYouthHouseholds.csv', 'w', newline='') as file:
#     writer = csv.writer(file)
#     writer.writerows(rowList)
