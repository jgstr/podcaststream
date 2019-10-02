// 1. Get MYSQL server running. Can use Docker image (directly).
// 2. Make sure that the server is actually running. (accepting connections).
//    Try connecting to it every so often until connected.
// 3. Create data-store with some configuration that tells data-store where
//    MySQL is (ie, the host/port/username/pass etc.)
// 4. Use the data-store function and getting correct results.
// -  Problems: no functions exist yet. Every read needs to have a corresponding
//    write ***. Write something using adapter then read something using adapter.
