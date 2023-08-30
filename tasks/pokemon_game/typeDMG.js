

function TypeEffectiveness(DMG, Type,onType) {
    let DMGInc = 1;
    let DMGDec = 1;
    let DMGNull = 1;
    let newDMG = 0;

    for (let i=0; i < onType.length; i++){
        if (onType[i] == "Normal") { //Defense Type
            if (Type == "Ghost") { //Offense Type
                DMGNull = 0; 
            }
            if (Type == "Fighting") { //Offense Type
                DMGInc *= 2;
            }
        }
        
        if (onType[i] == "Fire") { //Defense Type
            if (Type == "Water") { //Offense Type
                DMGInc *= 2; 
            }
            if (Type == "Ground") { //Offense Type
                DMGInc *= 2; 
            }
            if (Type == "Rock") { //Offense Type
                DMGInc *= 2; 
            }

            if (Type == "Fire") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Ice") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Steel") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fairy") { //Offense Type
                DMGDec *= 2; 
            }
        }

        if (onType[i] == "Water") { //Defense Type
            if (Type == "Fire") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Water") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Ice") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Steel") { //Offense Type
                DMGDec *= 2; 
            }

            if (Type == "Electric") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Grass") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Electric") { //Defense Type
            if (Type == "Electric") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Flying") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Steel") { //Offense Type
                DMGDec *= 2; 
            }

            if (Type == "Ground") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Grass") { //Defense Type
            if (Type == "Water") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Electric") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Ground") { //Offense Type
                DMGDec *= 2; 
            }

            if (Type == "Fire") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Ice") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Poison") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Flying") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Bug") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Ice") { //Defense Type
            if (Type == "Ice") { //Offense Type
                DMGDec *= 2; 
            }

            if (Type == "Fire") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Fighting") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Rock") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Steel") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Fighting") { //Defense Type
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Rock") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Dark") { //Offense Type
                DMGDec *= 2; 
            }

            if (Type == "Flying") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Psychic") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Fairy") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Poison") { //Defense Type
            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fighting") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Poison") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fairy") { //Offense Type
                DMGDec *= 2; 
            }

            if (Type == "Ground") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Psychic") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Ground") { //Defense Type
            if (Type == "Electric") { //Offense Type
                DMGNull = 0; 
            }

            if (Type == "Poison") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Rock") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Water") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Grass") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Ice") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Flying") { //Defense Type
            if (Type == "Ground") { //Offense Type
                DMGNull = 0; 
            }

            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fighting") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Electric") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Ice") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Rock") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Psychic") { //Defense Type
            if (Type == "Fighting") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Psychic") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Bug") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Ghost") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Dark") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Bug") { //Defense Type
            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fighting") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Ground") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Fire") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Flying") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Rock") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Rock") { //Defense Type
            if (Type == "Normal") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fire") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Poison") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Flying") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Water") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Grass") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Fighting") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Ground") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Steel") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Ghost") { //Defense Type
            if (Type == "Normal") { //Offense Type
                DMGNull = 0; 
            }
            if (Type == "Fighting") { //Offense Type
                DMGNull = 0; 
            }

            if (Type == "Poison") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Ghost") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Dark") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Dragon") { //Defense Type
            if (Type == "Fire") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Water") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Electric") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Ice") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Dragon") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Fairy") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Dark") { //Defense Type
            if (Type == "Psychic") { //Offense Type
                DMGNull = 0; 
            }

            if (Type == "Ghost") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Dark") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Fighting") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Bug") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Fairy") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Steel") { //Defense Type
            if (Type == "Poison") { //Offense Type
                DMGNull = 0; 
            }

            if (Type == "Normal") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Ice") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Flying") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Psychic") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Rock") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Dragon") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Steel") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fairy") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Fire") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Fighting") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Ground") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Fairy") { //Defense Type
            if (Type == "Dragon") { //Offense Type
                DMGNull = 0; 
            }

            if (Type == "Fighting") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Dark") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Poison") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Steel") { //Offense Type
                DMGInc *= 2;
            }
        }
    }

    DMG = Math.floor(DMG * DMGInc);
    DMG = Math.floor(DMG / DMGDec);
    DMG = Math.floor(DMG * DMGNull);
    newDMG = DMG;

    return newDMG;
}
function TypeEffMult(Type,onType) {
    let DMGInc = 1;
    let DMGDec = 1;
    let DMGNull = 1;
    let DMG = 1;

    for (let i=0; i < onType.length; i++){
        if (onType[i] == "Normal") { //Defense Type
            if (Type == "Ghost") { //Offense Type
                DMGNull = 0; 
            }
            if (Type == "Fighting") { //Offense Type
                DMGInc *= 2;
            }
        }
        
        if (onType[i] == "Fire") { //Defense Type
            if (Type == "Water") { //Offense Type
                DMGInc *= 2; 
            }
            if (Type == "Ground") { //Offense Type
                DMGInc *= 2; 
            }
            if (Type == "Rock") { //Offense Type
                DMGInc *= 2; 
            }

            if (Type == "Fire") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Ice") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Steel") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fairy") { //Offense Type
                DMGDec *= 2; 
            }
        }

        if (onType[i] == "Water") { //Defense Type
            if (Type == "Fire") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Water") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Ice") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Steel") { //Offense Type
                DMGDec *= 2; 
            }

            if (Type == "Electric") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Grass") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Electric") { //Defense Type
            if (Type == "Electric") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Flying") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Steel") { //Offense Type
                DMGDec *= 2; 
            }

            if (Type == "Ground") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Grass") { //Defense Type
            if (Type == "Water") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Electric") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Ground") { //Offense Type
                DMGDec *= 2; 
            }

            if (Type == "Fire") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Ice") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Poison") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Flying") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Bug") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Ice") { //Defense Type
            if (Type == "Ice") { //Offense Type
                DMGDec *= 2; 
            }

            if (Type == "Fire") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Fighting") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Rock") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Steel") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Fighting") { //Defense Type
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Rock") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Dark") { //Offense Type
                DMGDec *= 2; 
            }

            if (Type == "Flying") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Psychic") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Fairy") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Poison") { //Defense Type
            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fighting") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Poison") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fairy") { //Offense Type
                DMGDec *= 2; 
            }

            if (Type == "Ground") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Psychic") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Ground") { //Defense Type
            if (Type == "Electric") { //Offense Type
                DMGNull = 0; 
            }

            if (Type == "Poison") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Rock") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Water") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Grass") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Ice") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Flying") { //Defense Type
            if (Type == "Ground") { //Offense Type
                DMGNull = 0; 
            }

            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fighting") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Electric") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Ice") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Rock") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Psychic") { //Defense Type
            if (Type == "Fighting") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Psychic") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Bug") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Ghost") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Dark") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Bug") { //Defense Type
            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fighting") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Ground") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Fire") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Flying") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Rock") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Rock") { //Defense Type
            if (Type == "Normal") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fire") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Poison") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Flying") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Water") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Grass") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Fighting") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Ground") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Steel") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Ghost") { //Defense Type
            if (Type == "Normal") { //Offense Type
                DMGNull = 0; 
            }
            if (Type == "Fighting") { //Offense Type
                DMGNull = 0; 
            }

            if (Type == "Poison") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Ghost") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Dark") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Dragon") { //Defense Type
            if (Type == "Fire") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Water") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Electric") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Ice") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Dragon") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Fairy") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Dark") { //Defense Type
            if (Type == "Psychic") { //Offense Type
                DMGNull = 0; 
            }

            if (Type == "Ghost") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Dark") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Fighting") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Bug") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Fairy") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Steel") { //Defense Type
            if (Type == "Poison") { //Offense Type
                DMGNull = 0; 
            }

            if (Type == "Normal") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Ice") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Flying") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Psychic") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Rock") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Dragon") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Steel") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fairy") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Fire") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Fighting") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Ground") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Fairy") { //Defense Type
            if (Type == "Dragon") { //Offense Type
                DMGNull = 0; 
            }

            if (Type == "Fighting") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Dark") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Poison") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Steel") { //Offense Type
                DMGInc *= 2;
            }
        }
    }

    DMG = Math.floor(DMG * DMGInc);
    DMG = Math.floor(DMG / DMGDec);
    DMG = Math.floor(DMG * DMGNull);

    return DMG;
}