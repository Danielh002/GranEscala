function usersFollowingOrNot(searchResult,usersFollowing,user){
    i=0
    j=0
    res=[]
    while(i<searchResult.length && j<usersFollowing.length){
        position=searchResult[i].localeCompare(usersFollowing[j])
        console.log(i+" "+j)
        if(position==0){
            res.push({user:searchResult[i],follow:true})
            j++
            i++
        }
        else if(position==-1){
            if(searchResult[i]!=user){
                res.push({user:searchResult[i],follow:false})
            }
            i++
        }
        else{
            j++
        }
    }
    if(i<searchResult.length){
        while(i<searchResult.length){
            if(searchResult[i]!=user){
                res.push({user:searchResult[i],follow:false})
            }
            i++
        }
    }
    return res
}

module.exports={
    usersFollowingOrNot
}