export const fetchCategory = async () => {

    const response = await fetch("http://localhost:3000/category")

    if (response.ok) {
      const {data} = await response.json();
    
      return data.category;
    }
  
}