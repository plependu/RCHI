import pandas as pd
import csv
from helperFunctions import *

rowList = [['Category', 'Unsheltered']]

#! This file contains the Pit Count for Additional Homeless Population 
#* Preprocessing data 
df = pd.read_csv('../Data/PIT2020_FEB26,2020.csv').loc[lambda df: (df['P_Living_Situation'] != 'Couch'), :]


'''
Adults with a Serious Mental Illness
Adults with a Substance Use Disorder
Adults with HIV/AIDS
Adult Survivors of Domestic Violence (optional)
'''
rowList.append(['Adults with a Serious Mental Illness',totalAdultsMentalIllness(df)])
rowList.append(['Adults with a Substance Use Disorder',totalAdultsSubstanceAbuse(df)])
rowList.append(['Adults with HIV/AIDS',totalAdultsHIVorAIDS(df)])
rowList.append(['Adult Survivors of Domestic Violence (optional)',totalAdultsDomesticViolence(df)])

with open('./CSV/AdditionalHomelessPopulation.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(rowList)