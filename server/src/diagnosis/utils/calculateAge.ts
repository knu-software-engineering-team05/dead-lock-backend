export function calculateAge(birthDate: string) {
  const birthDateParts = birthDate.split('-');
  const birthYear = parseInt(birthDateParts[0]);
  const birthMonth = parseInt(birthDateParts[1]) - 1;
  const birthDay = parseInt(birthDateParts[2]);

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  let age = todayYear - birthYear;

  if (
    birthMonth < todayMonth ||
    (birthMonth === todayMonth && birthDay < todayDay)
  )
    age--;

  return age;
}
