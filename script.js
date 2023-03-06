// Data
const account1 = {
    owner: 'lauerl lance',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, 
    pin: 1111,
  };
  
  const account2 = {
    owner: 'thea queen',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  };
  
  const account3 = {
    owner: 'felicity smoak',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  };
  
  const account4 = {
    owner: 'oliver queen',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  };
  
  const account5 = {
    owner: 'roy harper',
    movements: [40, 13460, 7030,-300, 250,-9000, 900,10000],
    interestRate: 1,
    pin: 5555
  }
  
  const accounts = [account1, account2, account3, account4,account5];
  
  // Elements
  const labelWelcome = document.querySelector('.welcome');
  const labelDate = document.querySelector('.date');
  const labelBalance = document.querySelector('.balance__value');
  const labelSumIn = document.querySelector('.summary__value--in');
  const labelSumOut = document.querySelector('.summary__value--out');
  const labelSumInterest = document.querySelector('.summary__value--interest');
  const labelTimer = document.querySelector('.timer');
  
  const containerApp = document.querySelector('.app');
  const containerMovements = document.querySelector('.movements');
  
  const btnLogin = document.querySelector('.login__btn');
  const btnTransfer = document.querySelector('.form__btn--transfer');
  const btnLoan = document.querySelector('.form__btn--loan');
  const btnClose = document.querySelector('.form__btn--close');
  const btnSort = document.querySelector('.btn--sort');
  
  const inputLoginUsername = document.querySelector('.login__input--user');
  const inputLoginPin = document.querySelector('.login__input--pin');
  const inputTransferTo = document.querySelector('.form__input--to');
  const inputTransferAmount = document.querySelector('.form__input--amount');
  const inputLoanAmount = document.querySelector('.form__input--loan-amount');
  const inputCloseUsername = document.querySelector('.form__input--user');
  const inputClosePin = document.querySelector('.form__input--pin');

const addAccount = document.querySelector('.add')
const addButton = document.querySelector('.btn-add');  
const fullname = document.querySelector('.full-name');
const userpin = document.querySelector('.password');
const confirmAccount = document.querySelector('.add-btn');
  
  
  const displayMovements = function(movements,sort = false){
  
    const moves = sort ? movements.slice().sort((a,b) => a - b) : movements   
     
     containerMovements.innerHTML = ''
    moves.forEach(function(mov,i){
      const type = mov > 0 ? 'deposit' : 'withdrawal';
  
      const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
      <div class="movements__value">${(mov)}€</div>
    </div>`
  containerMovements.insertAdjacentHTML('afterbegin',html)
  
  })}
  
  
  
  
  // console.log(containerMovements.innerHTML);
  
  
  const createUserName = function(accs){
    accs.forEach(function(acc){
      acc.username = acc.owner.toLowerCase().split(' ').map(function(user){
      return user[0] 
    }).join('')
    // console.log(acc.username);
  
    })  
  }
  createUserName(accounts)
  
  const calBalance = function(acc){
    acc.balance = 
    acc.movements.reduce(function(acc,cur,i){
      return acc + cur;
    },0)
    labelBalance.textContent = `${acc.balance}€`
  }
  
  
  const updateUI = function(acc){
    displayMovements(acc.movements)
    calBalance(acc);
    calcDisplaySummary(acc);
  }
  
  
  
  
  
  const calcDisplaySummary = function(acc){
    const income = acc.movements.filter(mov => mov > 0)
    .reduce((acc,cur) => acc + cur,0)
    labelSumIn.textContent = `${income}€`
    const expense = acc.movements.filter(mov => mov < 0)
    .reduce((acc,cur) => acc + cur,0)
    labelSumOut.textContent = `${Math.abs(expense)}€`
  
    const intrest = acc.movements.filter((mov) => mov > 0).
    map(deposit => deposit * acc.interestRate/100).
    filter((mov,i,arr) =>  mov >= 1 ).
    reduce((acc,cur) => acc + cur,0)
    labelSumInterest.textContent = `${intrest}€`
  }
  
  
  
  labelSumIn.addEventListener('click',function(){
    document.querySelector('.app').style.opacity =
    0;
    document.querySelector('body').style.background = 'grey'
  })
  
  let currentAccount;
  
  btnLogin.addEventListener('click',function(e){
    e.preventDefault() // prevents form from submitting/reload
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
    if(currentAccount ?.pin === Number(inputLoginPin.value)){
      // display ui
      // display movement
      // display message
      // display balance
      containerApp.style.opacity =
      1;
      labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`
      inputLoginUsername.value = ""
      inputLoginPin.value = ""
      inputLoginPin.blur()
      updateUI(currentAccount)
    }
  
  })
  
  btnTransfer.addEventListener('click',function(e){
    e.preventDefault();
    const amount = Number(inputTransferAmount.value)
    const recieverAcc = accounts.find(acc => acc.username ===  inputTransferTo.value)
    console.log(recieverAcc,amount);
    inputTransferAmount.value = inputTransferTo.value = ""
    if(amount > 0 &&
       recieverAcc &&
       currentAccount.balance >= amount && recieverAcc.username !== currentAccount.username)
       {
         console.log('valid');
      currentAccount.movements.push(-amount)
      recieverAcc.movements.push(amount)
      updateUI(currentAccount)
  
    }
  })
  
                           
                           
                           
                           
  btnClose.addEventListener('click',function(e){
    e.preventDefault();
    const closePIN = Number(inputClosePin.value)
    if(currentAccount.username === inputCloseUsername.value  && closePIN === currentAccount.pin){
      const index = accounts.findIndex(acc => acc.username === currentAccount.username)
      console.log(index);
  
      accounts.splice(index , 1)
      console.log(accounts);
      containerApp.style.opacity = 0
    }
    inputCloseUsername.value = inputClosePin.value = ""
    labelWelcome.textContent = "Log in to get started"
  });
  
  btnLoan.addEventListener('click',function(e){
    e.preventDefault()
    const amount = Number(inputLoanAmount.value)
    if(amount > 0 && currentAccount.movements.some(mov => mov >= amount/10 )){
      currentAccount.movements.push(amount)
      updateUI(currentAccount)
    }
    inputLoanAmount.value = ""
  });
  
  let sorted = false;
  
  btnSort.addEventListener('click',function(e){
    e.preventDefault()
    displayMovements(currentAccount.movements , !sorted)
    sorted = !sorted
  })

addAccount.style.opacity = 0
addButton.addEventListener('click',function(){
    addAccount.style.opacity = 1
    labelWelcome.textContent = "Log in to get started"
})


confirmAccount.addEventListener('click',function(e){
    e.preventDefault()
    // addAccount.style.opacity = 0
    const len = accounts.length
    const account ={
        owner : fullname.value,
        movements : [500],
        interestRate : 1.5,
        pin : Number(userpin.value),
        username :  fullname.value.toLowerCase().split(' ').map(function(user){return user[0] }).join('')
}
accounts.push(account)
console.log(accounts);
fullname.value = userpin.value = ""
addAccount.style.opacity = 0;
})

