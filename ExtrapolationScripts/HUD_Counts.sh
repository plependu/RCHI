echo This file will generate the HUD csv files
echo Starting to generate csv files....

for file in *.py
do 
    python "$file"
    echo "$file" completed
done
