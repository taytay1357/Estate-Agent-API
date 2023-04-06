test('jest should use test db', ()=> {
   expect(process.env.DB_DATABASE).toBe('test_db')
})