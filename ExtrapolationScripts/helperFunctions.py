import pandas as pd

#* Household Filter Functions
def get_Total_Households_AdultsandChildren(originalData):
    total_adults = originalData.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) & (df['ParentGlobalID'].notnull()) )\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')


    total_children = originalData.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['ParentGlobalID'].notnull()))\
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')
    
    intersected_df = pd.merge(total_adults, total_children, how='inner').drop_duplicates(subset='ParentGlobalID')

    return intersected_df

def get_Total_Households_WithoutChildren(originalData):
    total_adults = originalData.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) & (df['ParentGlobalID'].notnull()) )\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')

    total_children = originalData.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['ParentGlobalID'].notnull()))\
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')

    set_diff_df = total_adults.merge(total_children, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates(subset='ParentGlobalID')

    return set_diff_df

def get_Total_Households_OnlyChildren(originalData):
    total_adults = originalData.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) & (df['ParentGlobalID'].notnull()) )\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')

    total_children = originalData.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['ParentGlobalID'].notnull()))\
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')

    set_diff_df = total_children.merge(total_adults, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    return set_diff_df

#* Veteran Households Filter Function 
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
    
    return  set_diff_df

def getTotalVeterans(originalData, newData):
    totalVeterans = originalData.loc[lambda df: ((df['Age As Of Today'] >= 18) & (df['United States Armed Forces'] == 'Yes') & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()

    return totalVeterans

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

def totalNumberOfPersons(originalData, newData):
    # totalPersons = originalData['ParentGlobalID'].isin(newData['ParentGlobalID']).sum()

    totalPersons = totalNumberOfAdults(originalData,newData) + totalNumberofYoungAdults(originalData,newData) + totalNumberOfChildren(originalData,newData)

    return totalPersons

def totalNumberOfChildren(originalData,newData):
    totalChildren = originalData.loc[lambda df: ((df['Age As Of Today'] < 18) & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()

    return totalChildren

def totalNumberofYoungAdults(originalData,newData):
    totalYoungAdults = originalData.loc[lambda df: (((df['Age As Of Today'] >= 18) & (df['Age As Of Today'] <= 24)) & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()

    return totalYoungAdults

def totalNumberOfAdults(originalData,newData):
    totalAdults = originalData.loc[lambda df: ((df['Age As Of Today'] > 24) & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()

    return totalAdults


#* Parenting Youth Counts
def totalNumberYouthParent(df,newData):
    return None

#* Gender Counts
def totalGenderCount(originalData,newData,category,extrapolate=None):
    totalCount = originalData.loc[lambda df: ((df['Gender'] == category) & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()
    return extrapolation(originalData,newData,"Gender",totalCount) + totalCount if extrapolate else totalCount

#* Ethnicity Counts
def totalEthnicityCount(originalData,newData,category,extrapolate=None):
    totalCount = originalData.loc[lambda df: ((df['Ethnicity'] == category) & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()

    return extrapolation(originalData,newData,"Ethnicity",totalCount) + totalCount if extrapolate else totalCount

#* Race Counts
def totalRaceCount(originalData,newData,category,extrapolate=None):
    if category == 'Multiple Race':
        totalCount = originalData.loc[lambda df: ((df['Race'].str.contains(pat=',')) & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
            .isin(newData['ParentGlobalID']).sum()
    else:
        totalCount = originalData.loc[lambda df: ((df['Race'] == category) & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
            .isin(newData['ParentGlobalID']).sum()

    return extrapolation(originalData,newData,"Race",totalCount) + totalCount if extrapolate else totalCount

#* Chronically Homeless
def totalChronicallyHouseholds(originalData,newData):
    ChronicallyHomelessHouseholds = originalData.loc[lambda df:((df['Chronically Homeless Status'] == 1) &(df['ParentGlobalID'].notnull()) ),['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID')['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()


    return ChronicallyHomelessHouseholds

def totalChronicallyIndividuals(originalData,newData):
    ChronicallyHomeHouseholds = originalData.loc[lambda df:((df['Chronically Homeless Status'] == 1) &(df['ParentGlobalID'].notnull()) ),['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID')

    intersected_df = pd.merge(ChronicallyHomeHouseholds, newData, how='inner').drop_duplicates(subset='ParentGlobalID')

    totalCount = originalData['ParentGlobalID'].isin(intersected_df['ParentGlobalID']).sum()

    return totalCount

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
def totalUnknown(originalData,newData, category):
    totalCount = originalData.loc[lambda df: ((df[category] == 'DoesntKnow') & (df['ParentGlobalID'].notnull())),['ParentGlobalID']]['ParentGlobalID']\
        .isin(newData['ParentGlobalID']).sum()
    return totalCount

def extrapolation(originalData, newData, category, totalCount):
    totalUnknownCount= totalUnknown(originalData,newData,category)
    totalKnown = totalNumberOfPersons(originalData,newData) -  totalUnknownCount
    return int(round((totalCount / totalKnown) *  totalUnknownCount)) if totalKnown else 0

def CheckingExtrapolation(extrapolationList, originalData, newData):
    totalPersons = totalNumberOfPersons(originalData,newData)
    extrapolatedSum = 0
    maxCategoryIndex = None
    maxCategoryValue = -1
    for idx, element in enumerate(extrapolationList):
        extrapolatedSum += element[2]
        if(maxCategoryValue < element[2]):
            maxCategoryValue = element[2]
            maxCategoryIndex = idx
    
    if extrapolatedSum != totalPersons:
        extrapolationList[maxCategoryIndex][2] += 1
    
    return None
    
