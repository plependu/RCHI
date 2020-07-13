import pandas as pd
from heapq import heappop, heappush, heapify 

#* Household Filter Functions
def get_Total_Households_AdultsandChildren(originalData):
    total_adults = originalData.loc[lambda df:\
         (((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) & (df['ParentGlobalID'].notnull())) | \
         ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Over25') | (df['Age Observed'] == 'Under24')) & (df['ParentGlobalID'].notnull())))
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')


    total_children = originalData.loc[lambda df:\
        (((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['ParentGlobalID'].notnull())) |\
            ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18') & (df['ParentGlobalID'].notnull())))
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')
    
    intersected_df = pd.merge(total_adults, total_children, how='inner').drop_duplicates(subset='ParentGlobalID')

    return intersected_df

def get_Total_Households_WithoutChildren(originalData):
    total_adults = originalData.loc[lambda df:\
         (((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) & (df['ParentGlobalID'].notnull())) | \
         ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Over25') | (df['Age Observed'] == 'Under24')) & (df['ParentGlobalID'].notnull())))
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')

    total_children = originalData.loc[lambda df:\
        (((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['ParentGlobalID'].notnull())) |\
            ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18') & (df['ParentGlobalID'].notnull())))
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')

    set_diff_df = total_adults.merge(total_children, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates(subset='ParentGlobalID')

    return set_diff_df

def get_Total_Households_OnlyChildren(originalData):
    total_adults = originalData.loc[lambda df:\
         (((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) & (df['ParentGlobalID'].notnull())) | \
         ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Over25') | (df['Age Observed'] == 'Under24')) & (df['ParentGlobalID'].notnull())))
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')

    total_children = originalData.loc[lambda df:\
        (((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['ParentGlobalID'].notnull())) |\
            ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18') & (df['ParentGlobalID'].notnull())))
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')

    set_diff_df = total_children.merge(total_adults, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    return set_diff_df

#* Veteran Households Filter Function 
#! Recheck helper function to see if calculation will work for extrapolation
def get_Total_Households_VeteransAdultsandChildren(originalData):
    total_adults = originalData.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) & (df['United States Armed Forces'] == 'Yes') & (df['ParentGlobalID'].notnull()) )\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')


    total_children = originalData.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['ParentGlobalID'].notnull()))\
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')
    
    intersected_df = pd.merge(total_adults, total_children, how='inner').drop_duplicates(subset='ParentGlobalID')
    return intersected_df

def get_Total_Households_VeteransWithoutChildren(originalData):
    total_adults = originalData.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) & (df['United States Armed Forces'] == 'Yes') & (df['ParentGlobalID'].notnull()) )\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')


    total_children = originalData.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['ParentGlobalID'].notnull()))\
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')
    
    set_diff_df = total_adults.merge(total_children, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()
    
    return set_diff_df

def getTotalVeterans(originalData, newData):
    totalVeterans = originalData.loc[lambda df: ((df['Age As Of Today'] >= 18) & (df['United States Armed Forces'] == 'Yes') & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()

    return totalVeterans

def nonVeteranObservHouseholds(originalData):
    total_adults = originalData.loc[lambda df:\
        ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Over25') | (df['Age Observed'] == 'Under24')) & (df['ParentGlobalID'].notnull()))
            ,['ParentGlobalID']]\
                .drop_duplicates(subset='ParentGlobalID')

    total_children = originalData.loc[lambda df:\
            ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18') & (df['ParentGlobalID'].notnull()))
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')

    set_diff_df = total_adults.merge(total_children, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates(subset='ParentGlobalID')

    return set_diff_df

def totalInterviewHouseholds(originalData):
    total_adults = originalData.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) & (df['ParentGlobalID'].notnull()))
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')

    total_children = originalData.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['ParentGlobalID'].notnull()))
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')

    set_diff_df = total_adults.merge(total_children, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates(subset='ParentGlobalID')

    return set_diff_df

def extrapolationVeteranHousehold(originalData,newData):
    totalUnknownCount = nonVeteranObservHouseholds(originalData).shape[0]
    totalKnown = totalInterviewHouseholds(originalData).shape[0]
    totalCount = newData.shape[0]

    return int(round((totalCount / totalKnown) *  totalUnknownCount)) +  totalCount if totalKnown else totalCount

def extrapolationVeteranTotalPersons(originalData, newData):
    totalUnknownCount = originalData.loc[lambda df: ((df['Household Survey Type'] == 'Observation') & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(nonVeteranObservHouseholds(originalData)['ParentGlobalID']).sum()

    totalKnown = originalData.loc[lambda df: ((df['Household Survey Type'] == 'Interview') & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(totalInterviewHouseholds(originalData)['ParentGlobalID']).sum()

    totalCount = totalNumberOfPersons(originalData,newData)

    return int(round((totalCount / totalKnown) *  totalUnknownCount)) +  totalCount if totalKnown else totalCount

def extrapolationTotalVeterans(originalData, newData):
    totalUnknownCount = originalData.loc[lambda df: ((df['Household Survey Type'] == 'Observation') & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(nonVeteranObservHouseholds(originalData)['ParentGlobalID']).sum()

    totalKnown = originalData.loc[lambda df: ((df['Household Survey Type'] == 'Interview') & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(totalInterviewHouseholds(originalData)['ParentGlobalID']).sum()

    totalCount = getTotalVeterans(originalData,newData)

    return int(round((totalCount / totalKnown) *  totalUnknownCount)) +  totalCount if totalKnown else totalCount

def extrapolationVeteranChronicPeople(originalData, newData,totalCount):
    totalUnknownCount = extrapolatedObservedVeteran(originalData,newData)

    totalKnown = originalData.loc[lambda df: ((df['Household Survey Type'] == 'Interview') & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()

    print("Total Unknonw {} total Known {} totalCount {} ".format(totalUnknownCount, totalKnown, totalCount))

    return int(round((totalCount / totalKnown) *  totalUnknownCount)) if totalKnown else 0

def extrapolationVeterans(originalData, newData, category, totalCount):
    totalUnknownCount= totalUnknownVeterans(originalData,newData,category)

    totalUnknownVeteran = originalData.loc[lambda df: ((df[category] == 'DoesntKnow') & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()

    totalKnown = totalNumberOfPersons(originalData,newData) - totalUnknownVeteran

    return int(round((totalCount / totalKnown) *  totalUnknownCount)) if totalKnown else 0

def totalUnknownVeterans(originalData,newData, category):
    # Unknown Count for Veteran Based on Category
    totalCount = originalData.loc[lambda df: ((df[category] == 'DoesntKnow') & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()

    totalUnknownCount = extrapolatedObservedVeteran(originalData,newData)  

    return totalCount + totalUnknownCount

def extrapolatedObservedVeteran(originalData,newData):
    #Total Number of Observational Individuals
    totalUnknownCount = originalData.loc[lambda df: ((df['Household Survey Type'] == 'Observation') & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(nonVeteranObservHouseholds(originalData)['ParentGlobalID']).sum()  
    
    totalKnown = originalData.loc[lambda df: ((df['Household Survey Type'] == 'Interview') & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(totalInterviewHouseholds(originalData)['ParentGlobalID']).sum()
    
    return int(round((totalNumberOfPersons(originalData,newData)/totalKnown) * totalUnknownCount))   



#* Unaccompanied Youth Households Filter Function
def get_Total_Households_UnaccompaniedYouth(originalData):
    total_Adults = originalData.loc[lambda df: ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] > 24)),['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID')

    total_NonChild_Youth = originalData.loc[lambda df: ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] <= 24) & (df['Relationship_To_HoH'] != 'Child')),['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID')

    total_Child_Youth = originalData.loc[lambda df: ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] <= 24) & (df['Relationship_To_HoH'] == 'Child')),['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID')

    set_diff_df = total_NonChild_Youth.merge(total_Adults, indicator=True, how="left", on='ParentGlobalID')[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()
    households_list = set_diff_df.merge(total_Child_Youth, indicator=True, how="left", on='ParentGlobalID')[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    return households_list

def get_Total_Households_ParentingYouth(originalData):
    total_Adults = originalData.loc[lambda df: ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] > 24)),['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID')

    total_Parenting_Youth = originalData.loc[lambda df: ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] <= 24) & (df['Relationship_To_HoH'] == 'Child')),['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID')

    households_list = total_Parenting_Youth.merge(total_Adults, indicator=True, how="left", on='ParentGlobalID')[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    return households_list

#* Household Counts
def totalNumberHouseholds(newData):
    return newData.shape[0]

def totalNumberOfPersons(originalData, newData,extrapolate=None):
    return totalNumberOfAdults(originalData,newData,1) + totalNumberofYoungAdults(originalData,newData,1) + totalNumberOfChildren(originalData,newData,1) if extrapolate else totalNumberOfAdults(originalData,newData) + totalNumberofYoungAdults(originalData,newData) + totalNumberOfChildren(originalData,newData)

def totalNumberOfChildren(originalData,newData,extrapolate=None):

    totalChildren = originalData.loc[lambda df:\
        (((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) &  (df['ParentGlobalID'].notnull())) |\
            ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18') & (df['ParentGlobalID'].notnull())))
               ,['ParentGlobalID']]\
        ['ParentGlobalID'].isin(newData['ParentGlobalID']).sum()

    return extrapolationAge(originalData,newData,"Age As Of Today","Age Observed",totalChildren) + totalChildren if extrapolate else totalChildren

def totalNumberofYoungAdults(originalData,newData,extrapolate=None):
    totalYoungAdults = originalData.loc[lambda df: \
        ((((df['Age As Of Today'] >= 18) & (df['Age As Of Today'] <= 24)) & (df['ParentGlobalID'].notnull())) | \
        ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under24') & (df['ParentGlobalID'].notnull()))),['ParentGlobalID']]\
        ['ParentGlobalID'].isin(newData['ParentGlobalID']).sum()

    return extrapolationAge(originalData,newData,"Age As Of Today","Age Observed",totalYoungAdults) + totalYoungAdults if extrapolate else totalYoungAdults

def totalNumberOfAdults(originalData,newData,extrapolate=None):
    totalAdults = originalData.loc[lambda df:\
         (((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] > 24) & (df['ParentGlobalID'].notnull())) | \
         ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Over25')) & (df['ParentGlobalID'].notnull())))
                ,['ParentGlobalID']]\
        ['ParentGlobalID'].isin(newData['ParentGlobalID']).sum()

    return extrapolationAge(originalData,newData,"Age As Of Today","Age Observed",totalAdults) + totalAdults if extrapolate else totalAdults


#* Parenting Youth Counts
def totalNumberYouthParent(df,newData):
    return None

#* Gender Counts
def totalGenderCount(originalData,newData,category,extrapolate=None,veteran=None):
    totalCount = originalData.loc[lambda df: (((df['Gender'] == category) | (df['Gender Observed'] == category)) & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()

    if veteran:
        return extrapolationVeterans(originalData,newData,"Gender",totalCount) + totalCount if extrapolate else totalCount
    else:
        return extrapolation(originalData,newData,"Gender","Gender Observed",totalCount) + totalCount if extrapolate else totalCount

#* Ethnicity Counts
def totalEthnicityCount(originalData,newData,category,extrapolate=None,veteran=None):
    observedCategory = ""
    if category == "No":
        observedCategory = "NonHispanic"
    else:
        observedCategory = "Hispanic"
    totalCount = originalData.loc[lambda df: (((df['Ethnicity'] == category) | (df['Hispanic Observed'] == observedCategory)) & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()

    if veteran:
        return extrapolationVeterans(originalData,newData,"Ethnicity",totalCount) + totalCount if extrapolate else totalCount
    else:
        return extrapolation(originalData,newData,"Ethnicity", "Hispanic Observed",totalCount) + totalCount if extrapolate else totalCount

#* Race Counts
def totalRaceCount(originalData,newData,category,extrapolate=None, veteran=None):
    if category == 'Multiple Race':
        totalCount = originalData.loc[lambda df: (((df['Race'].str.contains(pat=','))| (df['Race Observed'].str.contains(pat=','))) & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
            .isin(newData['ParentGlobalID']).sum()
    else:
        totalCount = originalData.loc[lambda df: (((df['Race'] == category) | (df['Race Observed'] == category)) & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
            .isin(newData['ParentGlobalID']).sum()

    if veteran:
        return extrapolationVeterans(originalData,newData,"Race",totalCount) + totalCount if extrapolate else totalCount
    else:
        return extrapolation(originalData,newData,"Race","Race Observed",totalCount) + totalCount if extrapolate else totalCount

#* Chronically Homeless
def totalChronicallyHouseholds(originalData,newData,extrapolate=None):
    ChronicallyHomelessHouseholds = originalData.loc[lambda df:((df['Chronically Homeless Status'] == 1) &(df['ParentGlobalID'].notnull()) ),['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID')['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()


    return extrapolationChronicHousehold(originalData,newData,ChronicallyHomelessHouseholds) + ChronicallyHomelessHouseholds if extrapolate else ChronicallyHomelessHouseholds

def totalChronicallyIndividuals(originalData,newData,extrapolate=None,Veteran=None):
    ChronicallyHomeHouseholds = originalData.loc[lambda df:((df['Chronically Homeless Status'] == 1) &(df['ParentGlobalID'].notnull()) ),['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID')

    intersected_df = pd.merge(ChronicallyHomeHouseholds, newData, how='inner').drop_duplicates(subset='ParentGlobalID')

    totalCount = originalData['ParentGlobalID'].isin(intersected_df['ParentGlobalID']).sum()

    if Veteran:
        return extrapolationVeteranChronicPeople(originalData,newData,totalCount) + totalCount if extrapolate else totalCount
    else:
        return extrapolationChronicPeople(originalData,newData,totalCount) + totalCount if extrapolate else totalCount


#* Additional Homeless Populations
def totalAdultsSubstanceAbuse(originalData):
    totalCount = originalData.loc[lambda df:((df['Substance Abuse'] == 'Yes') &(df['ParentGlobalID'].notnull()) ),['ParentGlobalID']]

    return totalCount.shape[0]

def totalAdultsMentalIllness(originalData):
    totalCount = originalData.loc[lambda df:((df['Mental Health Issue'] == 'Yes') &(df['ParentGlobalID'].notnull()) ),['ParentGlobalID']]

    return totalCount.shape[0]

def totalAdultsHIVorAIDS(originalData):
    totalCount = originalData.loc[lambda df:((df['HIV/AIDS'] == 'Yes') &(df['ParentGlobalID'].notnull()) ),['ParentGlobalID']]

    return totalCount.shape[0]

def totalAdultsDomesticViolence(originalData):
    totalCount = originalData.loc[lambda df:((df['Domestic Violence Victim'] == 'Yes') &(df['ParentGlobalID'].notnull()) ),['ParentGlobalID']]

    return totalCount.shape[0]

#* Extrapolation Helper Functions
def totalUnknown(originalData,newData, category, observedCategory):
    totalCount = originalData.loc[lambda df: (((df[category] == 'DoesntKnow') | (df[observedCategory] == 'NotSure')) & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()
    return totalCount

def extrapolation(originalData, newData, category,observedCategory, totalCount):
    totalUnknownCount= totalUnknown(originalData,newData,category,observedCategory)

    totalKnown = totalNumberOfPersons(originalData,newData,1) -  totalUnknownCount
    return int(round((totalCount / totalKnown) *  totalUnknownCount)) if totalKnown else 0

def extrapolationAge(originalData, newData, category,observedCategory, totalCount):
    totalUnknownCount= totalUnknown(originalData,newData,category,observedCategory)

    totalKnown = totalNumberOfPersons(originalData,newData)
    return int(round((totalCount / totalKnown) *  totalUnknownCount)) if totalKnown else 0

def extrapolationChronicHousehold(originalData, newData,totalCount):
    totalUnknownCount = originalData.loc[lambda df: ((df['Household Survey Type'] == 'Observation') & (df['ParentGlobalID'].notnull())),['ParentGlobalID']].drop_duplicates(subset="ParentGlobalID")['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()

    totalKnown = originalData.loc[lambda df: ((df['Household Survey Type'] == 'Interview') & (df['ParentGlobalID'].notnull())),['ParentGlobalID']].drop_duplicates(subset="ParentGlobalID")['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()

    return int(round((totalCount / totalKnown) *  totalUnknownCount)) if totalKnown else 0

def extrapolationChronicPeople(originalData, newData,totalCount):
    totalUnknownCount = originalData.loc[lambda df: ((df['Household Survey Type'] == 'Observation') & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()

    totalKnown = originalData.loc[lambda df: ((df['Household Survey Type'] == 'Interview') & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()

    return int(round((totalCount / totalKnown) *  totalUnknownCount)) if totalKnown else 0

def CheckingExtrapolation(extrapolationList, originalData, newData, Veteran=None):
    if Veteran:
        totalPersons = extrapolationVeteranTotalPersons(originalData,newData)
    else:
        totalPersons = totalNumberOfPersons(originalData,newData,1)

    print("Total Persons: ", totalPersons)

    extrapolatedSum = 0
    heap = [] 

    for idx, element in enumerate(extrapolationList):
        extrapolatedSum += element[2]
        heap.append((element[2],idx))

    heap.sort(reverse = True) 

    i = 0
    while extrapolatedSum != totalPersons:
        maxCategoryIndex = heap[i][1]
        extrapolationList[maxCategoryIndex][2] += 1
        extrapolatedSum += 1
        i +=1