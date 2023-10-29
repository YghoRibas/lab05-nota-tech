export const AccessObjectFromString = <T extends object>(object: T, def: string) => {
  let current = <any> object;

  let beforeRun = false;

  for(let i = 0; i < def.length; i++)
  {
    const character = def[i]

    if(!beforeRun && 
       (character == '[' || character == '.'))
    {
      if(i > 0){
        const value = def.substring(0, i)

        current = current[value]

        if(!current)
          return null
      }

      beforeRun = true; 
    }

    switch(character){
      case '[': {
        const start = ++i
        
        for(; def[i] != ']'; i++);
        
        const value = def.substring(start, i)

        current = current[value]

        if(!current)
          return null

        break;
      }

      case '.': {
        const start = ++i
        
        for(; i < def.length && 
                  def[i] != '[' &&
                  def[i] != '.'; i++);

        const value = def.substring(start, i)

        current = current[value]

        if(!current)
          return null

        --i;

        break;
      }
    }
  }

  if(!beforeRun)
    current = current[def]

  return current;
}

export default AccessObjectFromString;